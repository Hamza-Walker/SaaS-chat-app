import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import credentialsConfig from "../../../../../credentials-configuration";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { AdminAuth, adminDb } from "../../../../../firebase-admin";

const config = {
	providers: [google, credentialsConfig],
	secret: "adskklcsklmc,,,dlc",
	session: { strategy: "jwt" },
	adapter: FirestoreAdapter(adminDb),
	callbacks: {
		session: async({ session, token }) => {


			if (session?.user) {
				if (token.sub) {
					session.user.id = token.sub
					const firbaseToken = await AdminAuth.createCustomToken(token.sub);
					session.firebaseToken = firbaseToken;
				}
			}
			return session;
		},
		jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},

	debug: true, // Enable debug mode for more detailed logs
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
