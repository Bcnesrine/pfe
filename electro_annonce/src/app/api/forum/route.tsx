import { connectDB } from '../../lib/mango_db';
import ForumModel from '../../models/forums';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const forum = await ForumModel.find({});
        return NextResponse.json(forum);
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
        const forumData = await req.json();

        // Créer une instance de ForumModel avec les données reçues
        const newForum = new ForumModel(forumData);

        // Sauvegarder le nouveau forum dans la base de données
        await newForum.save();

        // Répondre avec un message de succès
        return new NextResponse(JSON.stringify({ message: 'Forum créé avec succès', forum: newForum }), { status: 201 });
    } catch (error) {
        console.error('Error creating forum:', error);
        // Renvoyer un message d'erreur
        return new NextResponse(JSON.stringify({ message: 'Erreur lors de la création du forum' }), { status: 500 });
    }
}
