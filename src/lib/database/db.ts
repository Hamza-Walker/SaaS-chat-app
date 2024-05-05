import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL in .env is not set");
}


const client = new Client({
	connectionString: process.env.DATABASE_URL,
})

await client.connect();

export const db = drizzle(client);


