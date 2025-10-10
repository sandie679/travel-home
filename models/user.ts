import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
 
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
