import mongoose, { Document, Schema } from "mongoose";

interface IClientPermission extends Document {
  role: mongoose.Types.ObjectId;
  resource: mongoose.Types.ObjectId;
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClientPermissionSchema = new Schema<IClientPermission>(
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

const ClientPermission = mongoose.model<IClientPermission>(
  "ClientPermission",
  ClientPermissionSchema,
);

export default ClientPermission;
