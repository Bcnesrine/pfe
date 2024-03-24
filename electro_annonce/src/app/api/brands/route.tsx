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
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Assurez-vous de vous connecter à la base de données avant de faire des opérations
        await connectDB();

        // Récupérer les données de la requête POST
        const brandData = await req.json();

        // Créer une instance de BrandModel avec les données reçues
        const newBrand = new BrandModel(brandData);

        // Sauvegarder la nouvelle marque dans la base de données
        await newBrand.save();

        // Répondre avec un message indiquant que la marque a été ajoutée avec succès
        return new NextResponse(JSON.stringify({ message: 'Marque ajoutée avec succès', brand: newBrand }), { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la marque :', error);
        // Répondre avec un message d'erreur indiquant que la marque n'a pas pu être ajoutée
        return new NextResponse(null, { status: 500 });
    }
}
