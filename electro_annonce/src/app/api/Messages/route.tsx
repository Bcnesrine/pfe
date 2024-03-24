

import { connectDB } from '../../lib/mango_db';
import MessageModel, { IMessage } from '../../models/MessagesModel';
import { NextRequest, NextResponse } from 'next/server';
import url from 'url';



export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const Message = await MessageModel.find({});
        return NextResponse.json(Message);
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
        const messageData = await req.json();

        // Vérifier si le message existe déjà dans la base de données
        const existingMessage = await MessageModel.findOne({ content: messageData.content });

        // Si le message existe déjà, renvoyer un message d'erreur
        if (existingMessage) {
            return new NextResponse(JSON.stringify({ message: 'Ce message existe déjà.' }), { status: 409 });
        }

        // Créer une instance de MessageModel avec les données reçues
        const newMessage: IMessage = new MessageModel({
            date: messageData.date,
            content: messageData.content,
            author: messageData.author
        });

        // Sauvegarder le nouveau message dans la base de données
        await newMessage.save();

        // Répondre avec le nouveau message créé
        return new NextResponse(JSON.stringify(newMessage), { status: 201 });
    } catch (error) {
        console.error('Error creating message:', error);
        return new NextResponse(JSON.stringify({ message: 'Erreur serveur lors de la création du message.' }), { status: 500 });
    }
}
export default async function PATCH(req: NextRequest, res: NextResponse) {
    // Assurez-vous de vous connecter à la base de données avant de faire des opérations
    await connectDB();

    try {
        // Extraire l'identifiant du message de l'URL
        const urlParts = req.url.split('/');
        const messageId = urlParts[urlParts.length - 1];

        // Récupérer les données partielles du message à mettre à jour à partir du corps de la requête
        const partialMessageData = await req.json();

        // Mettre à jour le message dans la base de données
        const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, partialMessageData, { new: true });

        // Si le message n'existe pas, renvoyer une erreur 404
        if (!updatedMessage) {
            return NextResponse.error();
        }

        // Répondre avec le message mis à jour
        return NextResponse.json(updatedMessage);
    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.error();
    }
}