import mongoose from "mongoose";

const { Schema } = mongoose;

const zairaSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    }

}
    

);

export default mongoose.models.Zaira || mongoose.model("Zaira", zairaSchema);
