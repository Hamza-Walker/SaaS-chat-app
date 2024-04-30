import { addDoc, collection, doc,userId getDoc, setDoc } from "firebase/firestore";

import { createNewCustomerInStripe } from "./CreateNewCustomerInStripe";
import { db } from "../../firebase";
import { generateUniqueId } from "./GenerateUniqueId";
import { getCustomerFromDb } from "./GetCustomerFromDb";
import { saveCustomerToDb } from "./saveCustomerToDb";

// utils/createCheckoutSession.js
export const createCheckoutSession = (userId:string, email:string) => {
  return new Promise((resolve, reject) => {
    // Check if the customer exists in your database
    getCustomerFromDb(userId)
      .then(customerInDb => {
        let customerId;
        if (customerInDb) {
          // If the customer exists in your database, use their Stripe customer ID
          customerId = customerInDb.stripeCustomerId;
        } else {
          // If the customer does not exist in your database, create a new customer in Stripe
          return createNewCustomerInStripe(email)
            .then(newCustomer => {
              customerId = newCustomer.id;
              // Save the new customer's Stripe ID to your database
              return saveCustomerToDb(userId, customerId);
            });
        }
        return customerId;
      })
      .then(customerId => {
        // Generate a unique ID for the checkout session
        const checkoutSessionId = generateUniqueId(); // Implement this function to generate a unique ID

        // Construct the reference to the checkout session document
        const checkoutSessionRef = doc(db, "customers", userId, "checkout_sessions");

        // Check if the document already exists
        return getDoc(checkoutSessionRef).then(docSnap => {
          if (docSnap.exists()) {
            // Document already exists, handle accordingly
            reject(new Error("Checkout session already exists"));
          } else {
            // Document does not exist, proceed to add it
            return setDoc(checkoutSessionRef, {
              id: checkoutSessionId, // Include the unique ID as a field
              price: "price_1PAneH06UTZ8nZjb7oPWCnJD",
              success_url: window.location.origin,
              cancel_url: window.location.origin,
              customer: customerId,
            }).then(() => {
              resolve(checkoutSessionId); // Resolve with the unique ID
            }).catch(error => {
              console.error("Error creating checkout session:", error);
              reject(error);
            });
          }
        });
      });
 });
};


