import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../lib/mango_db';
import UserModel from '../../models/users';

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    // Assurez-vous de vous connecter à la base de données avant de faire des opérations
    await connectDB();

    try {
        // Récupérer l'ID de l'utilisateur à supprimer à partir de la requête
        const { user_id } = req.query;

        // Vérifier si l'ID de l'utilisateur est fourni dans la requête
        if (!user_id) {
            return res.status(400).send("L'ID de l'utilisateur est requis.");
        }

        // Rechercher l'utilisateur dans la base de données
        const user = await UserModel.findOne({ user_id });

        // Si l'utilisateur n'existe pas, renvoyer une erreur 404
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé.");
        }

        // Supprimer l'utilisateur de la base de données
        await UserModel.deleteOne({ user_id });

        // Répondre avec un message indiquant que l'utilisateur a été supprimé avec succès
        return res.status(200).send("Utilisateur supprimé avec succès.");
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        return res.status(500).send("Erreur serveur lors de la suppression de l'utilisateur.");
    }
}
