import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-04-10",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const sigHeader = req.headers["stripe-signature"];
	let event:Stripe.Event;

	try {
		if (!sigHeader) {
			throw new Error("Missing Stripe signature header");
		}
		event = stripe.webhooks.constructEvent(
			req.body,
			sigHeader,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err: any) {
		res.status(400).send(`Webhook Error: ${err.message}`);
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
