"use client";

import CreateChatButton from "./CreateChatButton";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import Logo from "./Logo";
import { MessagesSquareIcon } from "lucide-react";
import React from "react";
import UserButton from "./UserButton";
import { auth } from "../app/api/auth/[...nextauth]/auth";
import { useSession } from "next-auth/react";

function Header() {
	const { data: session } = useSession();
	console.log(session);
	return (
		<div>
			<header className=" sticky top-0 z-50 bg-white dark:bg-gray-900">
				<nav className="flex items-columns sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto ">
					<Logo />
					<div className="flex-1 flex items-center justify-end space-x-4">
						{/* language switcher */}

						{session ? (
							<>
								<Link href={"/chat"} >
									<MessagesSquareIcon className="text-black dark:text-white" />
								</Link>
								<CreateChatButton />
							</>
						) : (
							<>
								<Link href={"/pricing"}>Pricing</Link>
							</>
						)}
						<DarkModeToggle />
						<UserButton session={session} />
					</div>
				</nav>
				{/* upgrade banner */}
			</header>
		</div>
	);
}

export default Header;
