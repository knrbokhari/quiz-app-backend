import mongoose from "mongoose";
import { IUser } from "./usersInterface";

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    user_type: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true },
);

const UserModel = mongoose.model<UserDocument>("users", UserSchema);

export default UserModel;
