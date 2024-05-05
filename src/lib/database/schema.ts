import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define the User Schema with Firebase Token
export const $user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  imageURL: text("image_url"),
  firebaseToken: text("firebase_token"), // Field to store the Firebase token
});

// Define the Session Schema with User Reference
export const $session = pgTable("session", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => $user.id).notNull(),
  user: jsonb("user").notNull(), // Storing user details as a JSON object
  expires: timestamp("expires").notNull(), // Storing the session expiration time
});

// Infer types for easy usage in TypeScript
export type UserType = typeof $user.$inferInsert;
export type SessionType = typeof $session.$inferInsert;
