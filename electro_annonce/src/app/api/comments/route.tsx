import { connectDB } from '../../lib/mango_db';
import CommentModel from '../../models/comments';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const comment = await CommentModel.find({});
        return NextResponse.json(comment);
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
        const commentData = await req.json();

        // Créer une instance de CommentModel avec les données reçues
        const newComment = new CommentModel(commentData);

        // Sauvegarder le nouveau commentaire dans la base de données
        await newComment.save();

        // Répondre avec un message indiquant que le commentaire a été ajouté avec succès
        return NextResponse.json({ message: 'Le commentaire a été ajouté avec succès.' }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        // Répondre avec un message d'erreur indiquant que le commentaire n'a pas pu être ajouté
        return NextResponse.json({ message: 'Erreur lors de l\'ajout du commentaire. Veuillez réessayer.' }, { status: 500 });
    }
}

