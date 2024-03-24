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
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectDB();

        const coordinateData = await req.json();
        const newCoordinate = new CoordinatModel(coordinateData);

        await newCoordinate.save();

        return new NextResponse(JSON.stringify({ message: 'Coordonnées ajoutées avec succès', coordinate: newCoordinate }), { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout des coordonnées :', error);
        return new NextResponse(JSON.stringify({ message: 'Erreur lors de l\'ajout des coordonnées. Veuillez réessayer.' }), { status: 500 });
    }
}