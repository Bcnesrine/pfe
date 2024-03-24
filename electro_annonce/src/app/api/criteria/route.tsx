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
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectDB();

        const criteriaData = await req.json();
        const newCriteria = new CriteriaModel(criteriaData);

        await newCriteria.save();

        return new NextResponse(JSON.stringify({ message: 'Critères ajoutés avec succès', criteria: newCriteria }), { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout des critères :', error);
        return new NextResponse(JSON.stringify({ message: 'Erreur lors de l\'ajout des critères. Veuillez réessayer.' }), { status: 500 });
    }
}