// Importing mongoose ODM
import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Reading", "Video", "Quiz"],
    },
    duration: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
    },
    question: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ModuleModel = mongoose.model<UserDocument>("module", moduleSchema);
export default ModuleModel;
