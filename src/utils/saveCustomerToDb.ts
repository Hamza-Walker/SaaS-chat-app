import { addDoc, collection } from "firebase/firestore";

// utils/saveCustomerToDb.ts
import { db } from "../../firebase";

export const saveCustomerToDb = async (userId: string, stripeCustomerId: string) => {
 try {
    await addDoc(collection(db, "customers"), {
      userId,
      stripeCustomerId,
      // Add any other necessary fields
    });
 } catch (error) {
    console.error('Error saving customer to database:', error);
    throw error;
 }
};
