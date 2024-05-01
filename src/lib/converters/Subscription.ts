import { collection, query } from "firebase/firestore";

import { db } from "../../../firebase";

export const subscriptionRef = (userId: string) => {
  return query(
    collection(db, 'customers', userId, 'subscriptions')
  );
};
