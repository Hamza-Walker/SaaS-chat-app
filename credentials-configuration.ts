import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";

// this file is for experimenting 
const credentialsConfig = CredentialsProvider({
	name: "Credentials",
	credentials: {
		username: {
			label: "Username",
			type: "text",
		},
		password: {
			label: "Password",
			type: "password", 
		},
	},
	async authorize(credentials) {
		const csrfToken = await getCsrfToken();

		const res = await fetch(
		"http://localhost:3000/api/auth/signin/credentials",
		{
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			"CSRF-Token": csrfToken,
			},
			body: JSON.stringify(credentials),
		
			}

		);
		const user = await res.json();
		console.log(user)

		if (user) {
			return user;
		} else {
			return null;
		}
	},
});


export default credentialsConfig;
