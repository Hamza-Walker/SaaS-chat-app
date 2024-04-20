
import CredentialsProvider from "next-auth/providers/credentials";

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
		if (credentials.username === "admin" && credentials.password === "admin")
			return { id: "1", name: "admin" };
		else return null;
	},
});

//TODO: connect with firbase database to validate users and passwords upon creation 

export default credentialsConfig;
