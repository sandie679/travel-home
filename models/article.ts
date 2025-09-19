import mongoose, { Schema, model, models } from "mongoose";

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  authorId: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

const Article = models.Article || model("Article", articleSchema);
export default Article;
