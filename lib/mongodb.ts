import mongoose from "mongoose";

declare global {
  
  var mongoose: any;
}


const MONGO_URI = process.env.MONGODB_URL!;

if (!MONGO_URI) throw new Error("Please define MONGODB_URL in .env");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;
