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
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Assurez-vous de vous connecter à la base de données avant de faire des opérations
        await connectDB();

        // Récupérer les données de la requête POST
        const categoryData = await req.json();

        // Créer une instance de CategoryModel avec les données reçues
        const newCategory = new CategoryModel(categoryData);

        // Sauvegarder la nouvelle catégorie dans la base de données
        await newCategory.save();

        // Répondre avec un message indiquant que la catégorie a été ajoutée avec succès
        return new NextResponse(JSON.stringify({ message: 'Catégorie ajoutée avec succès', category: newCategory }), { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie :', error);
        // Répondre avec un message d'erreur indiquant que la catégorie n'a pas pu être ajoutée
        return new NextResponse(null, { status: 500 });
    }
}
