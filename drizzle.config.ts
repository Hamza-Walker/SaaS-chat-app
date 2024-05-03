import type { Config } from "drizzle-kit";
import dotenv from 'dotenv';

dotenv.config({
	path: '.env.local', // Ensure the correct path to your .env.local file
  });

const config: Config = {
	schema: "./src/lib/database/schema.ts",
	out: "./db.ts",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!,
	},
};

export default config;

// drizzle.config.ts does not have access to the .env file if its in the src directory !
// soloution is to get the following package npm instal dotenv
// make sure to add the path to the schema file relative to this one