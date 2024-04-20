import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut } from "@/app/api/auth/[...nextauth]/auth";

import { Button } from "./ui/button";
import React from "react";
import { Session } from "next-auth";
import UserAvatar from "./UserAvatar";

function UserButton({ session }: { session: Session | null }) {

	// subscription listener 
	if (!session) {
		return (
			<form action={async () => {
				"use server"
				await signIn();
			}}>
				<Button variant="outline">
					Sign In
				</Button>
			</form>

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
							<form action={async () => {
								"use server"
								await signOut();
							}}>
					<Button variant="outline" className="w-full">
								Sign Out
							</Button>
						</form>
					</DropdownMenuContent>
				</DropdownMenu >
			)
		);
	}
}

export default UserButton;
