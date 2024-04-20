import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import credentialsConfig from "./credentials-configuration";


const config = {
	providers: [google, credentialsConfig],
} satisfies NextAuthConfig;


export const { handlers, auth, signIn, signOut } = NextAuth(config);
