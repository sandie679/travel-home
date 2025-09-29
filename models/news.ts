import mongoose from "mongoose";

const { Schema } = mongoose;

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content:{
        type: String,
        required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

     readTime: { type: String, default: "5 mins" 

     },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model("News", newsSchema);
