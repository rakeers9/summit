import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  trophies: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  credentials: {
    age: Number,
    location: String,
    occupation: String,
    degrees: [String],
  },
  accuracy: { type: Number, default: 0 },
  total_num_of_imgs_analyzed: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
