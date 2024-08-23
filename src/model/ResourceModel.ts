import mongoose, { Document, Schema } from "mongoose";

interface IResource extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Resource = mongoose.model<IResource>("Resource", ResourceSchema);

export default Resource;
