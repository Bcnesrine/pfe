// pages/api/users.js

import { connectDB } from '../../lib/mango_db';
import UserModel from '../../models/users';
import { NextRequest, NextResponse } from 'next/server';



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("hello");
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     await connectDB();

//     try {
//         const users = await UserModel.find({});
//         return res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const users = await UserModel.find({});
        return NextResponse.json(users);
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
        const userData = await req.json();

        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await UserModel.findOne({ user_id: userData.user_id });

        // Si l'utilisateur existe déjà, renvoyer un message d'erreur
        if (existingUser) {
            return NextResponse.json({ message: 'Cet utilisateur existe déjà.' }, { status: 409 });
        }

        // Créer une instance de UserModel avec les données reçues
        const newUser = new UserModel(userData);

        // Sauvegarder le nouvel utilisateur dans la base de données
        await newUser.save();

        // Répondre avec le nouvel utilisateur créé
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.error();
    }
}





import url from 'url';

export async function PATCH(req: NextRequest, res: NextResponse) {
    // Assurez-vous de vous connecter à la base de données avant de faire des opérations
    await connectDB();

    try {
        // Analyser l'URL pour obtenir les paramètres
        const parsedUrl = url.parse(req.url, true);
        const user_id = parsedUrl.query.user_id as string;

        // Récupérer les données partielles de l'utilisateur à mettre à jour à partir du corps de la requête
        const partialUserData = await req.json();

        // Rechercher l'utilisateur dans la base de données
        let user = await UserModel.findOne({ user_id });

        // Si l'utilisateur n'existe pas, renvoyer une erreur 404
        if (!user) {
            return NextResponse.error();
        }

        // Mettre à jour les champs spécifiés dans les données partielles
        Object.assign(user, partialUserData);

        // Sauvegarder l'utilisateur mis à jour dans la base de données
        await user.save();

        // Répondre avec l'utilisateur mis à jour
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.error();
    }
}






