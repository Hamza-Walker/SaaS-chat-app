"use client";
import { Button } from "./ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "../../store/store";

export const Upgradebanner = () => {
	const subscription = useSubscriptionStore((state) => state.subscription);
	const isPro = subscription?.role === "pro";
	const router = useRouter();

if (subscription === undefined || !isPro) {
	return null;
}
	return (
		<Button onClick={() => router.push("/register")}
		className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
		>
			Upgrade
		</Button>

		
	);
}

