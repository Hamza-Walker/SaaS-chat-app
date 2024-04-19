import { CheckIcon } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";
import React from "react";

const tiers = [
	{
		name: "Starter",
		id: null,
		href: "#",
		monthlyPrice: null,
		description: " Get chatting right away with anyone, anywhere!",
		features: [
			"20 Messages/Day",
			"2 Participant Limit in Chat",
			"3 Chat Rooms Limit",
			"Supports 2 languafes",
			"48-hour Support",
		]
	},
	{
		name: "Pro",
		id: "si_OnlcsLNQYbMVzV",
		href: "#",
		monthlyPrice: "$5.99",
		description: "Unlock the full potential with Pro!",
		features: [
			"Unlimited Messages in Chats",
			"Unlimited Participants in Chats ",
			"Unlimited Chat Rooms",
			"Supports uo to 10 languages",
			"Multimedia support in chats (comming soon)",
			"1 hour, ddicated support response time",
			"Early access to New Features",
		]
	}
]





const PricingCards = ({ redirect } :{ redirect : boolean}) => {
  return (
     <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
       {tiers.map((tier) => (
         <div
           key={tier.id}
           className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
         >
           <div>
             <h3
               id={tier.id + tier.name}
               className="text-base font-semibold leading-7 text-indigo-600"
             >
               {tier.name}
             </h3>
             <p className="mt-4 flex items-baseline gap-x-2">
               {tier.monthlyPrice ? (
                 <>
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                     {tier.monthlyPrice}
                  </span>
                  <span className="text-base font-semibold leading-7 text-gray-900">
                     /month
                  </span>
                 </>
               ) : (
                 <span className="text-5xl font-bold tracking-tight text-gray-900">
                  Free
                 </span>
               )}
             </p>
           </div>
           <p className="mt-6 text-base leading-7 text-gray-600">
             {tier.description}
           </p>
           <ul
             role="list"
             className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
           >
             {tier.features.map((feature) => (
               <li key={feature} className="flex gap-x-3">
                 <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                 {feature}
               </li>
             ))}
           </ul>
           {redirect ? (
             <Link href="/register" className="text-indigo-600">
                 Get started today
             </Link>
           ) : (
             tier.id && <CheckoutButton />
           )}
         </div>
       ))}
     </div>
  );
 };

export default PricingCards;
