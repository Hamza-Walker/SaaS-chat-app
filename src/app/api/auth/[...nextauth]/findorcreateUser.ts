"use client"

import { $user, UserType } from "@/lib/database/schema";

import { db } from "@/lib/database/db";
import { eq } from "drizzle-orm";

export async function findOrCreateUser(userId: any, userDetails: UserType): Promise<any> {
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
    .where(eq($user.id, Number(userId)))
    .returning();
   
    if (existingUser) {
       // If the user exists, return the existing user
       return existingUser;
    } else {
       // If the user does not exist, create a new user
       const newUser = await db.insert($user).values({
         id: Number(userId),
        name: userDetails.name,
         email: userDetails.email,
         imageURL: userDetails.imageURL,
         firebaseToken: userDetails.firebaseToken,
       }).returning();
   
       return newUser;
    }
   }