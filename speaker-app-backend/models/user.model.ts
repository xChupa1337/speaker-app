import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    langFrom: { type: String },
    langTo: { type: String },
    darkMode: { type: Boolean },
  },
  { _id: false },
);

const progressSchema = new mongoose.Schema(
  {
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    settings: settingsSchema,
    progress: [progressSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
