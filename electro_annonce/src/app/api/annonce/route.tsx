import { connectDB } from '../../lib/mango_db';
import AnnonceModel from '../../models/annonce';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const annonce = await AnnonceModel.find({});
        return NextResponse.json(annonce);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}
