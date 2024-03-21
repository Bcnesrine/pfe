import { connectDB } from '../../lib/mango_db';
import ForumModel from '../../models/forums';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const forum = await ForumModel.find({});
        return NextResponse.json(forum);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}