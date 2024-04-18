import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react";

function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
