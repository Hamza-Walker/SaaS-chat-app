"use client";

import { signOut } from "@/app/api/auth/[...nextauth]/auth";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { firebaseAuth } from "../../firebase";


async function syncFirebasAuth(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(firebaseAuth , session.firebaseToken);
    } catch (error) {}
  } else {
	  signOut()
  }
}

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    syncFirebasAuth(session);
  }, [session]);

  return <>{children}</>;
}

export default FirebaseAuthProvider;
