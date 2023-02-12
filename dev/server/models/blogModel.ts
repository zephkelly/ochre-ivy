import mongoose, { } from 'mongoose';

export interface IBlog extends mongoose.Document {
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
}

export const BlogSchema = new mongoose.Schema({
  uri: String,
  title: String,
  titleLower: String,
  subtitle: String,
  description: String,
  createdDate: String,
  updatedDate: String,
  cover: String,
  tags: Array,
  content: {type:Object, required:true},
  views: Number,
});

export const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema);
export default BlogModel;