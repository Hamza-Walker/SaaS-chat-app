"use client";
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
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

function UserButton({ session }: { session: Session | null }) {
	if (!session) {
		return (
			<Button
				variant="outline"
				onClick={() => 
				signIn("google")}
				>
				Sign In
			</Button>
		);
	} else {
		// Session ..
		return (
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar
						name="Hamza Walker"
						image={
							"https://avatars.githubusercontent.com/u/64838536?s=400&u=16f40ee9f72bab964f78a1b18ae1a7141fd7dff5&v=4"
						}
						className=""
					/>
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
}

export default UserButton;
