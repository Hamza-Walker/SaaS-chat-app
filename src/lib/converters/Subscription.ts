import {
	FirestoreDataConverter,
	QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Subscription } from "../../../types/Subscription";
import { db } from "../../../firebase";

const subscriptionConverter: FirestoreDataConverter<Subscription> = {
	toFirestore: (subscription: Subscription) => subscription,
	fromFirestore: (snapshot: QueryDocumentSnapshot) =>
		snapshot.data() as Subscription,
};

export const subscriptionRef = (userId: string) => {
	collection(db, "customers", userId, "subscriptions").withConverter(
		subscriptionConverter,
	);
};
