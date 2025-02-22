import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  reviews_per_image: { type: Number, required: true },
  image_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  target: { type: String, default: "None" }, // Defines the target demographic
  prompt: { type: String, required: true },  // The instruction shown to users
  total_images: { type: Number, required: true }, // Total images in the folder
  total_images_reviewed_fully: { type: Number, default: 0 }, // Fully reviewed images count
  task_type: { type: String, default: "None" }, // classification vs segmentation
});

const Folder = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
export default Folder;
