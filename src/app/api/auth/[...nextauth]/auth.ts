import type { NextAuthConfig, Session } from "next-auth";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import credentialsConfig from "../../../../../credentials-configuration";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminDb, AdminAuth } from "../../firebase-admin";
import { $session, SessionType, UserType } from "@/lib/database/schema";
import { db } from "@/lib/database/db";
import { IdTokenResult } from "firebase/auth";
import { findOrCreateUser } from "./findorcreateUser";

const config = {
  providers: [google, credentialsConfig],
  secret: "adskklcsklmc,,,dlc",
  session: { strategy: "jwt" },
  adapter: FirestoreAdapter(adminDb),
  callbacks: {
    session: async ({ session, token }:{session:Session, token:any}) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;
          const firbaseToken = await AdminAuth.createCustomToken(token.sub);
          session.user.firebaseToken = firbaseToken;

          const userDetails : UserType= {
            id:  Number(session.user.id), // Added this line
            name: String(session.user.name),
            email: String(session.user.email),
            imageURL: session.user.image, // Adjust this if necessary
            firebaseToken: session.user.firebaseToken, // Adjust this if necessary
          };
          // Call findOrCreateUser with the user's ID and details
          await findOrCreateUser(userDetails.id, userDetails);

        }
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;

        
      }
      return token;
    },
  },

  //debug: true, // Enable debug mode for more detailed logs
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
