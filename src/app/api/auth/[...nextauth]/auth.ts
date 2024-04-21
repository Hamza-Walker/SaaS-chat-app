import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import credentialsConfig from "../../../../../credentials-configuration";

const config = {
  providers: [google, credentialsConfig],
  secret:"adskklcsklmc,,,dlc",
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  debug: true, // Enable debug mode for more detailed logs
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
