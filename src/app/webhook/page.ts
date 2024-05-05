import { NextApiRequest, NextApiResponse } from "next";

import { $order } from "@/lib/database/schema";
import Stripe from "stripe";
import { db } from "@/lib/database/db";
import { drizzle } from "drizzle-orm/node-postgres";
import rawBody from 'raw-body';

// Assuming you have a Stripe instance initialized somewhere
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

// Define the structure of a cart item for simplicity
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Function to process cart items from Stripe checkout session
async function getCartItems(line_items: any[]): Promise<CartItem[]> {
    // Example processing logic
    return line_items.map(item => ({
        id: item.price.id,
        name: item.description,
        price: item.price.unit_amount / 100, // Convert to dollars
        quantity: item.quantity,
    }));
}
async function insertOrder(orderData) {
	// Assuming orderData is already prepared and contains all necessary fields
	// Convert JSON objects to strings if necessary
	const orderItemsString = JSON.stringify(orderData.orderItems);
	const shippingInfoString = JSON.stringify(orderData.shippingInfo);
	const paymentInfoString = JSON.stringify(orderData.paymentInfo);
  
	// Insert the order
	const result = await $order.insert({
	  shippingInfoId: orderData.shippingInfo.id, // Assuming shippingInfo has an id property
	  userId: orderData.user,
	  orderItems: orderItemsString,
	  paymentInfoId: orderInfo.paymentInfo.id, // Assuming paymentInfo has an id property
	  orderStatus: orderData.orderStatus || "Processing", // Default to "Processing" if not provided
	  createdAt: new Date(), // Use the current timestamp
	});
  
	console.log(result); // Log the result of the insertion
  }
  
// Handler function for the API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let event;
    try {
        const requestBody = await rawBody(req);
        const signature = req.headers["stripe-signature"]!;
        event = stripe.webhooks.constructEvent(requestBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id);

            const orderItems = await getCartItems(line_items.data); // Assuming listLineItems returns an object with a data property
            const userId = session.client_reference_id;
            const amountPaid = session.amount_total / 100;

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status,
                amountPaid,
                taxPaid: session.total_details.amount_tax / 100,
            };

			const orderData = {
				user: userId,
				shippingInfo: session.metadata.shippingInfo,
				paymentInfo,
				orderItems,
			  };

            // Assuming Order is a model defined elsewhere in your application
            insertOrder(orderData);
            res.status(201).json({ success: true });
        }
    } catch (err: any) {
        console.error("An error occurred with the webhook:", err.message);
    }
}
