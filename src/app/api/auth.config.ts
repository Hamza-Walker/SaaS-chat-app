import { FirestoreAdapter } from "@auth/firebase-adapter"
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { adminDb } from "@/app/api/firebase-admin";

export const { auth, handlers } = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	session: {
		strategy: "jwt",
	},
	adapter: FirestoreAdapter(adminDb),
	secret: process.env.AUTH_SECRET,

});
