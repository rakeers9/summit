import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://hi:hello@boilermakexii.d2rj0.mongodb.net/?retryWrites=true&w=majority&appName=boilermakeXII";

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn; // Use existing connection

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
