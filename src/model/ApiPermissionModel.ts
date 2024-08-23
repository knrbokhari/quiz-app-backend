import mongoose, { Document, Schema } from "mongoose";

interface IApiPermission extends Document {
  role: mongoose.Types.ObjectId;
  resource: mongoose.Types.ObjectId;
  actions: "Read" | "Write" | "Update" | "Delete";
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ApiPermissionSchema = new Schema<IApiPermission>(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    actions: {
      type: String,
      enum: ["Read", "Write", "Update", "Delete"],
      required: true,
    },
    access: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ApiPermission = mongoose.model<IApiPermission>(
  "ApiPermission",
  ApiPermissionSchema,
);

export default ApiPermission;
