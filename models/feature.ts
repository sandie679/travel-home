import mongoose from "mongoose";

const { Schema } = mongoose;

const featureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Feature ||
  mongoose.model("Feature", featureSchema);
