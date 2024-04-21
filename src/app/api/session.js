import { authOptions } from "../../auth/[...nextauth]"; // Adjust the import path as necessary
// pages/api/session.js
import { getServerSession } from "next-auth/next";

async function getrequest (req, res) {
 const session = await getServerSession(req, res, authOptions);

 if (session) {
    // If a session exists, return the session data
    res.status(200).json(session);
 } else {
    // If no session exists, return an error
    res.status(401).json({ error: 'Not authenticated' });
 }
};

export default getrequest