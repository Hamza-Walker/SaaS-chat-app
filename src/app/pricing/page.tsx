import PricingCard from "@/components/PricingCards";
import React from "react";

function PricingPage() {
  return (
    <div className="isolate overflow-hidden bg-gray-100 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl px-6 pb-12 pt-24 text-center sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-4xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-indigo-500 dark:text-indigo-400 sm:text-4xl">Pricing</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          The right pricing plan for you <br className="hidden sm:inline lg:hidden" />
          whoever you are
        </p>
      </div>
      <div className="relative mt-6">
        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          We're 99.9% confident that you’ll enjoy our service.
        </p>
          <svg viewBox="0 0 1024 1024" className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0">
            <ellipse cx={684} cy={512} fill="url(#radial-gradient-pricing)" rx={604} ry={512} />
            <defs>
              <radialGradient id="radial-gradient-pricing">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
        <div className="-mt-0 pb-20">
		<PricingCard redirect={true} />
	</div>
    </div>
  );
}


 

export default PricingPage;
