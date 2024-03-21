import mongoose, { Schema, Document } from 'mongoose';

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

const CategoryModel = mongoose.models.category || mongoose.model<ICategory>('category', categorySchema);

export default CategoryModel;
