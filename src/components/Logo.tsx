import React from "react";
import logoImage from "@logos/orange.png";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

function Logo() {
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center w-72 h-14">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image
            priority
            src={logoImage}
            alt="logo"
            width={100} // Example width, adjust as needed
            height={100} // Example height, adjust as needed
            className="dark:filter dark:invert"
          />
        </AspectRatio>
      </div>
    </Link>
  );
}

export default Logo;
