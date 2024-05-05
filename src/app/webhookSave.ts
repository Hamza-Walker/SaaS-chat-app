import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import rawBody from 'raw-body';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-04-10",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	
	let event; 
	try {
		const requestBody = await rawBody(req)
		const signature= req.headers["stripe-signature"]!;
		event = stripe.webhooks.constructEvent(
			req.body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
		
	} catch (err: any) {
		console.log("error occured with the webhook")
		return;
	}

	// handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;
			console.log(paymentIntent);
			break;
		case "payment_method.attached":
			const paymentMethod = event.data.object;
			console.log("PaymentMethod was attached to a Customer!");
			break;
		default:
			console.log("Unhandled event type", event.type);
	}
	// Return a response to acknowledge receipt of the event
	res.json({ received: true });
}
console.log(stripe.subscriptionItems)
