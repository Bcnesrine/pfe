import { connectDB } from '../../lib/mango_db';
import CategoryModel from '../../models/categories';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const category = await CategoryModel.find({});
        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}