import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
    category_id: string;
    name: string;
    description: string;
    images: string[];
}

const categorySchema: Schema = new Schema({
    category_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }] // URLs or references to images
});

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
