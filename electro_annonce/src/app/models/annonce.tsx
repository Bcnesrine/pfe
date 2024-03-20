import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface représentant un document d'annonce
interface AnnonceDocument extends Document {
    user_id: string;
    title: string;
    description: string;
    date: Date;
    condition: string;
    brand: string;
    model_name: string; // Changer le nom de la propriété à model_name
    comments: string[]; // IDs referencing comments
    images: string[]; // URLs or references to images
}


const annonceSchema = new Schema<AnnonceDocument>({
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    condition: { type: String, required: true },
    brand: { type: String, required: true },
    model_name: { type: String, required: true }, // Utiliser le nouveau nom de la propriété
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Références aux commentaires
    images: [{ type: String }] // URLs ou références aux images
});

// Vérifie si le modèle Annonce existe déjà
let AnnonceModel: Model<AnnonceDocument>;

try {
    // Essaie de récupérer le modèle Annonce
    AnnonceModel = mongoose.model<AnnonceDocument>('Annonce');
} catch (error) {
    // Si le modèle n'existe pas encore, le définit
    AnnonceModel = mongoose.model<AnnonceDocument>('Annonce', annonceSchema);
}

export default AnnonceModel;

