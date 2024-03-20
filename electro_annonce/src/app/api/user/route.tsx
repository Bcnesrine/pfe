// pages/api/users.js

import { connectDB } from '../../lib/mango_db';
import UserModel from '../../models/users';
import { NextRequest, NextResponse } from 'next/server';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("hello");
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     await connectDB();

//     try {
//         const users = await UserModel.find({});
//         return res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const users = await UserModel.find({});
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}
