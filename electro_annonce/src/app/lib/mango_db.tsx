// db.ts

import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Création du modèle et de la collection si nécessaire
    await createUserModelIfNotExists();
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
  }
}

async function createUserModelIfNotExists() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB 2 !');
    // Vérifier si la collection existe déjà
    const collections = await mongoose.connection.db.collections();
    const collectionExists = collections.some(collection => collection.collectionName === 'pfe');

    // Si la collection n'existe pas, créer le modèle et la collection
    if (!collectionExists) {
      console.log('Creating "pfe" collection');
      await mongoose.connection.db.createCollection('pfe');
      console.log('Created "pfe" collection');
    }
  } catch (error) {
    console.error('Error creating pfe collection:', error);
  }
}




