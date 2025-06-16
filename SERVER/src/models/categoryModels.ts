import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  isNewConstruction: { type: Boolean, default: false },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
