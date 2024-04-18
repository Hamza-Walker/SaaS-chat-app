import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

function UserButton() {

	// Session .. 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name="Hamza Walker" image={"https://avatars.githubusercontent.com/u/64838536?s=400&u=16f40ee9f72bab964f78a1b18ae1a7141fd7dff5&v=4"} className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
