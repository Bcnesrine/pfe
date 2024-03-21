import { connectDB } from '../../lib/mango_db';
import BrandModel from '../../models/brands';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const brands = await BrandModel.find({});
        return NextResponse.json(brands);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}