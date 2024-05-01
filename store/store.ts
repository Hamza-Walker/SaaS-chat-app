import { Subscription } from "../types/Subscription";
import { create } from "zustand";
import { warn } from "console";

export type LanguagesSupported =
"en"|"es"|"de"|"fr"|"ar"|"ru"|"zh"|"ja"|"pt"|"it"|"nl"|"ko"|"tr"|"pl"|"sv"|"hi"|"bn"|"id"|"vi"|"th"

export const languagesSupportedMap: Record<LanguagesSupported, string> = {
	"en": "English",
	"es": "Spanish",
	"de": "German",
	"fr": "French",
	"ar": "Arabic",
	"ru": "Russian",
	"zh": "Chinese",
	"ja": "Japanese",
	"pt": "Portuguese",
	"it": "Italian",
	"nl": "Dutch",
	"ko": "Korean",
	"tr": "Turkish",
	"pl": "Polish",
	"sv": "Swedish",
	"hi": "Hindi",
	"bn": "Bengali",
	"id": "Indonesian",
	"vi": "Vietnamese",
	"th": "Thai"
}


interface subscriptionState {
	subscription: Subscription | null;
	setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<subscriptionState>((set) => ({
	subscription: null,
	setSubscription: (subscription: Subscription | null) => set(() => {
		return {
			subscription
		}
	}),
}))


