// pages/api/users.js

import { connectDB } from '../../lib/mango_db';
import UserModel from '../../models/users';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const users = await UserModel.find({
            id : req.nextUrl.searchParams.get('id'),
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}
