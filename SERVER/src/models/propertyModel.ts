import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  district: { type: String, required: true },
  street: { type: String, required: true },
  house_number: { type: String, required: true },
  apartment: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
});

const constructionDetailsSchema = new mongoose.Schema({
  finishing_type: { type: String, required: true },
  completion_date: { type: Date, required: true },
});

const detailsSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  year_built: { type: Number, required: true },
  material: { type: String, required: true },
  //
  area: { type: String, required: true },
  rooms: { type: Number, required: true },
  floor: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  price_per_m2: { type: Number, required: true },
  nearby_facilities: { type: [String], required: true },
  comment: { type: String },
  renovation: { type: String, required: true },
  bathroom: { type: String, required: true },
  balcony: { type: String, required: true },
  mortgage: { type: Boolean, required: true, default: false },
  is_urgent: { type: Boolean, required: true, default: false },
  views: { type: Number, required: true, default: 0 },
  favorites: { type: Number, required: true, default: 0 },
  published_date: { type: Date, required: true },
  construction_details: { type: constructionDetailsSchema },
  heating: { type: String, default: "Нет" },
  ceiling_height: { type: String, required: true },
  parking: { type: String, default: "Нет" },
  completion_year: { type: Number },
  //
});

const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  preview: { type: String, required: true },
});

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  address: { type: addressSchema, required: true },
  images: { type: [imageSchema], required: true },
  property_class: { type: String, required: true },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  inputNumber: { type: String, required: true },
  details: { type: detailsSchema, required: true },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
