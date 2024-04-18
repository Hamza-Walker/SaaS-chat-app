import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

function UserAvatar({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {image && (
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}

      <AvatarFallback
        delayMs={1000}
        className="dk:bg-white dark:text-black text-lg"
      >
        {name
          ?.split(" ")
          ?.map((word) => word[0])
          ?.join("")
          ?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
