import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react"; // Import useSession hook

import { Button } from "./ui/button";
import React from "react";
import UserAvatar from "./UserAvatar";

function UserButton() {
  const { data: session } = useSession(); // Use the useSession hook to access session data

  if (!session) {
    return (
      <Button onClick={() => signIn()} variant="outline">
        Sign In
      </Button>
    );
  } else {
    return (
      session && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar
              name={session.user?.name}
              image={session.user?.image}
              className=""
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    );
  }
}

export default UserButton;

