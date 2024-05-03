import { collection, doc, query } from "firebase/firestore";
import { db } from "../../../firebase";

export const subscriptionRef = (userId: string) => {
  // First, get a reference to the customer document
  const customerDocRef = doc(db, 'customers', userId);
  
  // Then, construct a query to the subscriptions subcollection of the customer document
  return query(
    collection(customerDocRef, 'subscriptions')
  );
};

