"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const createCheckoutSession = () => {
    if (!session) return;
    setLoading(true);
 
    // Using Promises directly with .then() and .catch()
    addDoc(collection(db, "customers", session.user?.id, "checkout_sessions"), {
      price: "price_1PBWab06UTZ8nZjbnRkD4KAZ",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })
      .then((docRef) => {
        return onSnapshot(docRef, (snap) => {
          const data = snap.data();
          const url = data?.url;
          const error = data?.error;
          if (error) {
            alert(`Error: ${error.message}`);
            setLoading(false);
          }
          if (url) {
            window.location.assign(url);
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* if subscribed show me the user is subscribed */}
      <button
        onClick={() => createCheckoutSession()}
        className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default"
      >
        {loading ? "Loading..." : "Subscribe"}
      </button>
    </div>
  );
}

export default CheckoutButton;
