import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  folder_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
});

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
