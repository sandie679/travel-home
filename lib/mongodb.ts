import mongoose from "mongoose";

const connect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return; 
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Could not connect to database:", error);
    throw new Error("Could not connect to database");
  }
};

export default connect;
