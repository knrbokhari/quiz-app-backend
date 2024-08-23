import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      default: "User",
      required: true,
    },
    slug: {
      type: String,
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Role = mongoose.model<IRole>("Role", RoleSchema);

export default Role;
