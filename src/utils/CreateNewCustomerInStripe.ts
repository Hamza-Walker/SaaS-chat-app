// utils/CreateNewCustomerInStripe.ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-04-10' });

export const createNewCustomerInStripe = async (email: string) => {
 try {
    const customer = await stripe.customers.create({ email });
    return customer;
 } catch (error) {
    console.error('Error creating customer in Stripe:', error);
    throw error;
 }
};
