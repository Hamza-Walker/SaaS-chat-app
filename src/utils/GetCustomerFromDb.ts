import { collection, getDocs, query, where } from "firebase/firestore";

// utils/GetCustomerFromDb.ts
import { db } from "../../firebase";

export const getCustomerFromDb = async (userId: string) => {
 const q = query(collection(db, "customers"), where("userId", "==", userId));
 const querySnapshot = await getDocs(q);
 if (!querySnapshot.empty) {
    // Assuming each user has a unique ID, so we just return the first match
    const doc = querySnapshot.docs[0];
    return doc.data();
 }
 return null;
};
