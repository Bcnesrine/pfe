import { connectDB } from '../../lib/mango_db';
import CoordinatModel from '../../models/coordinates';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const coordinate = await CoordinatModel.find({});
        return NextResponse.json(coordinate);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}