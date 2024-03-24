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
export async function POST(req: NextRequest, res: NextResponse) {
    // Assurez-vous de vous connecter à la base de données avant de faire des opérations
    await connectDB();

    try {
        // Récupérer les données de la requête POST
        const annonceData = await req.json();

        // Vérifier si l'annonce existe déjà dans la base de données
        const existingAnnonce = await AnnonceModel.findOne({ user_id: annonceData.user_id, title: annonceData.title });

        // Si l'annonce existe déjà, renvoyer un message d'erreur
        if (existingAnnonce) {
            return new NextResponse(JSON.stringify({ message: 'Cette annonce existe déjà.' }), { status: 409 });
        }

        // Créer une instance de AnnonceModel avec les données reçues
        const newAnnonce = new AnnonceModel(annonceData);

        // Sauvegarder la nouvelle annonce dans la base de données
        await newAnnonce.save();

        // Répondre avec la nouvelle annonce créée et un message indiquant qu'elle a été ajoutée avec succès
        return new NextResponse(JSON.stringify({ message: 'Annonce ajoutée avec succès', newAnnonce }), { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de l\'annonce :', error);
        // Renvoyer une erreur interne du serveur
        return new NextResponse(null, { status: 500 });
    }
}
