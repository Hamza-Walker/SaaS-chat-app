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
import { signIn, signOut } from "auth";

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
								await signOut("google");
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
