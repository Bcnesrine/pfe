import { connectDB } from '../../lib/mango_db';
import CriteriaModel from '../../models/criteria';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const criteria = await CriteriaModel.find({});
        return NextResponse.json(criteria);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error();
    }
}