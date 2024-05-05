import React, { useState } from "react";
import { useSession } from "next-auth/react";

async function createCheckoutSession() {
 const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price: "price_1PBWab06UTZ8nZjbnRkD4KAZ",
      success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/cancel`,
    }),
 });

 const session = await response.json();
 return session.id;
}
