import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  preview: { type: String, required: true },
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  email: { type: String },
  images: { type: [imageSchema], required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  is_verified: { type: Boolean, default: true },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
