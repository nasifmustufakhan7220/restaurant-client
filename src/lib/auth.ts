import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Reuse ONE MongoClient across serverless invocations (cached on globalThis).
// This avoids "Topology is closed" and pool exhaustion on Vercel.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };
const client =
  globalForMongo._mongoClient ??
  new MongoClient(process.env.MONGODB_CLIENT_URL as string, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
  });

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = client;
}

const db = client.db("pizza-hub");

export const auth = betterAuth({
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
          console.log("Hook received role:", user.role);
          const safeRole = user.role === "vendor" ? "vendor" : "customer";
          console.log("Safe role:", safeRole);
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
  // Cache sessions in cookies so not every request hits MongoDB.
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