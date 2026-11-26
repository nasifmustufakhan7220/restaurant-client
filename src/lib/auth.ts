import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_CLIENT_URL as string;

type MongoCache = { promise: Promise<MongoClient> | null };

const cached =
  (globalThis as unknown as { _mongoClient?: MongoCache })._mongoClient ??
  ((globalThis as unknown as { _mongoClient?: MongoCache })._mongoClient = {
    promise: null,
  });

async function getClient(): Promise<MongoClient> {
  if (!cached.promise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });
    cached.promise = client.connect().catch((err) => {
      cached.promise = null; // allow retry on next request
      throw err;
    });
  }

  const client = await cached.promise;

  // If a previous invocation closed this topology, discard and reconnect.
  if (
    (client as unknown as { topology?: { isClosed?: () => boolean } })
      .topology?.isClosed?.()
  ) {
    cached.promise = null;
    return getClient();
  }

  return client;
}

const client = await getClient();
const db = client.db("pizza-hub");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  ].filter(Boolean) as string[],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "vendor", "admin"],
        input: true,
        required: true,
        defaultValue: "customer",
      },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const safeRole = user.role === "vendor" ? "vendor" : "customer";
          return {
            data: {
              ...user,
              role: safeRole,
              isBlocked: false,
            },
          };
        },
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});