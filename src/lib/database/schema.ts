import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define the User Schema with Firebase Token
export const $user = pgTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  imageURL: text("image_url"),
  firebaseToken: text("firebase_token"), // Field to store the Firebase token
});

// Define the Session Schema with User Reference
export const $session = pgTable("session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => $user.id).notNull(), // Updated to match the type of user.id
  user: jsonb("user").notNull(), // Storing user details as a JSON object
  expires: timestamp("expires").notNull(), // Storing the session expiration time
});



// Define the Address Schema
export const $address = pgTable("address", {
  id: serial("id").primaryKey(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  phoneNo: text("phone_no").notNull(),
  zipCode: text("zip_code").notNull(),
  country: text("country").notNull(),
  userId: integer("user_id").references(() => $user.id).notNull(), // Assuming you have a User table
  createdAt: timestamp("created_at").defaultNow(),
});


// Define the PaymentInfo Schema
export const $paymentInfo = pgTable("payment_info", {
  id: integer("id").primaryKey().notNull(),
  status: text("status").notNull(),
  taxPaid: integer("tax_paid").notNull(),
  amountPaid: integer("amount_paid").notNull(),
});

// Define the Order Schema
export const $order = pgTable("order", {
  id: serial("id").primaryKey(),
  shippingInfoId: integer("shipping_info_id").references(() => $address.id).notNull(),
  userId: integer("user_id").references(() => $user.id).notNull(),
  orderItems: jsonb("order_items").notNull(), // Storing order items as a JSON object
  paymentInfoId: integer("payment_info_id").references(() => $paymentInfo.id).notNull(),
  orderStatus: text("order_status").default("Processing"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Infer types for easy usage in TypeScript
export type OrderType = typeof $order.$inferInsert;
export type UserType = typeof $user.$inferInsert;
export type SessionType = typeof $session.$inferInsert;
export type AddressType = typeof $address.$inferInsert;

