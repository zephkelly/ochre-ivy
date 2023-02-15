import { Schema, Document, model } from 'mongoose';

export module Blog {
  export interface IBlog extends Document {
    uri: string;
    title: string;
    titleLower: string;
    subtitle: string;
    description: string;
    createdDate: string;
    updatedDate: string;
    cover: string;
    tags: string[];
    content: object;
    views: number;
    comments: object[];
  }

  export const BlogSchema = new Schema({
    uri: String,
    title: String,
    titleLower: String,
    subtitle: String,
    description: String,
    createdDate: String,
    updatedDate: String,
    cover: String,
    tags: Array,
    content: { type: Object, required: true },
    views: Number,
    comments: Array
  });

  export const Model = model<IBlog>('Blog', BlogSchema);
}