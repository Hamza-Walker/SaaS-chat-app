'use client';

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
import { findOrCreateUser } from "@/app/api/auth/[...nextauth]/findorcreateUser";

function UserButton() {
	const { data: session } = useSession();
	if (!session) {
		return (
			<Button onClick={() => {
				findOrCreateUser(session.user.id, { ...session.user, name: session.user.name || '' });
				signIn();
			}
			} variant="outline">
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

