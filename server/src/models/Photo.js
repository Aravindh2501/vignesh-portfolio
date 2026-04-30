import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      lowercase: true, // always stored lowercase: "Outdoor" → "outdoor"
      trim: true,
    },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    blurData: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Photo", photoSchema);
