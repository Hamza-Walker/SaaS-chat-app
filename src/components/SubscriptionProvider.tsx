'use client';

import { ReactNode, useEffect } from "react";

import { Subscription } from "../../types/Subscription";
import { onSnapshot } from "firebase/firestore";
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "../../store/store";

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore((state) => state.setSubscription);

  useEffect(() => {
    if (!session) {
      return;
    }
    return onSnapshot(subscriptionRef(session?.user?.id), (snapshot) => {
      if (snapshot.empty) {
        console.log("No subscriptions found");
				console.log(session)
				console.log(snapshot)
        setSubscription(null);
      } else {
        console.log("Subscriptions for user found");
        
        setSubscription(snapshot.docs.map(doc => doc.data() as Subscription)[0]);
      }
    });
  }, [session, setSubscription]);

  return <>{children}</>
};

