"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { MessageSquareIcon } from "lucide-react";

function CreateChatButton() {
	const router = useRouter();
	const createChat = async () => {
		router.push(`/chat/abc`);
	}


	return (
		<Button onClick={createChat} variant={"ghost"}>
			<MessageSquareIcon />
		</Button>
	);
}

export default CreateChatButton;
