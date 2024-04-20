"use client";

import React from "react";
import { auth } from "../app/api/auth/[...nextauth]/auth";

async function CheckoutButton () {
	 const session = await auth()
	const createCheckoutSession = async () => {
		if (!session) {
			return;
		}
		// create checkout session	
		// oush document to firebase db 
		// stripe extesntion on firebase will create a checkout session 
		// redirect user to checkout page 
	}
	return (
		<div className="flex flex-col space-y-2">
			{/* if subscribed show me the user is subscribed */}
			<button className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default">
				Sign Up
			</button>
		</div>
	);
}

export default CheckoutButton;
