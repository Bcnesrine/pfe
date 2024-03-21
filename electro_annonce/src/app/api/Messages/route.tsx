

import { connectDB } from '../../lib/mango_db';
import MessageModel from '../../models/MessagesModel';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const users = await MessageModel.find({});
        return NextResponse.json(MessageModel);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}



