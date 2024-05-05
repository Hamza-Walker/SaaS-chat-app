import { $user, UserType } from "@/lib/database/schema";

import { db } from "@/lib/database/db";
import { eq } from "drizzle-orm";

export default async function findOrCreateUser(userId: any, userDetails: UserType): Promise<any> {
    // Ensure userId is a valid integer
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
        console.error('Invalid userId:', userId);
        throw new Error('Invalid userId');
    }

    // Check if the user exists
    const existingUser = await db.update($user).set({
        name: userDetails.name,
        email: userDetails.email,
        imageURL: userDetails.imageURL,
        firebaseToken: userDetails.firebaseToken,
        
    })
    .where(eq($user.id, userId))
    .returning();
   
    if (existingUser) {
       // If the user exists, return the existing user
       console.log(`User with ID ${userId} already exists. Updated details:`, existingUser);
       return existingUser;
    } else {
       // If the user does not exist, create a new user
       const newUser = await db.insert($user).values({
         id: userId,
        name: userDetails.name,
         email: userDetails.email,
         imageURL: userDetails.imageURL,
         firebaseToken: userDetails.firebaseToken,
       }).returning();
   
       console.log(`New user created with ID ${userId}:`, newUser);
       return newUser;
    }
   }
