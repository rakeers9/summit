import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  reviews_per_image: { type: Number, required: true },
  image_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
});

export default mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
