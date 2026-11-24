import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_CLIENT_URL as string);
const db = client.db("pizza-hub");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
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
  database: mongodbAdapter(db, {
    client,
  }),
});
