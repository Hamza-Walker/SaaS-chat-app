"use client";

import React, { useEffect } from "react";

import { Session } from "next-auth";
import { firebaseAuth } from "../../firebase";
import { signInWithCustomToken } from "firebase/auth";
import { signOut } from "@/app/api/auth/[...nextauth]/auth";
import { useSession } from "next-auth/react";

async function syncFirebasAuth(session: Session) {
  if (session && session.user.firebaseToken) {
    try {
      await signInWithCustomToken(firebaseAuth , session.user.firebaseToken);
    } catch (error) {}
  } else {
	  signOut()
  }
}

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    const sync = async () => {
       if (!session) return;
       await syncFirebasAuth(session);
    };
    sync();
   }, [session]);

   return <>{children}</>;
  }

export default FirebaseAuthProvider;
