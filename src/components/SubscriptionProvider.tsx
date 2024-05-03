"use client";

import { ReactNode, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { Subscription } from "../../types/Subscription";
import { db } from "../../firebase";
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "../../store/store";

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
	const { data: session } = useSession();
	const setSubscription = useSubscriptionStore(
		(state) => state.setSubscription,
	);

	useEffect(() => {
		if (!session) {
			return;
		}
    getUserSubscriptions(session?.user?.id);

    async function getUserSubscriptions(userId:string) {
      const userDocRef = doc(db, "customers", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const subscriptions = userDocSnap.data().subscriptions;
        console.log("User subscriptions:", subscriptions);
        // Process the subscriptions as needed
      } else {
        console.log("No such document!");
      }
    }
		return onSnapshot(
			subscriptionRef(session?.user?.id),
			(snapshot) => {
				if (snapshot.empty) {
					console.log("No subscriptions found");
					console.log(session?.user?.id);
					setSubscription(null);
					
				} else {
					console.log("Subscriptions for user found");
					// Assuming you want to set the first subscription found
					const firstSubscription = snapshot.docs.map(
						(doc) => doc.data() as Subscription,
					)[0];
					console.log(firstSubscription);
					setSubscription(firstSubscription);
				}
			},
			(error) => {
				// Error handling for the onSnapshot listener
				console.error("Error fetching subscriptions:", error);
			},
		);
	}, [session, setSubscription]);

	return <>{children}</>;
};
