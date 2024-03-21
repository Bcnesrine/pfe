import { connectDB } from '../../lib/mango_db';
import CommentModel from '../../models/comments';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const comment = await CommentModel.find({});
        return NextResponse.json(comment);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}