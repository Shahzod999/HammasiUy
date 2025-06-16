import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profile_name: { type: String, required: true },
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
