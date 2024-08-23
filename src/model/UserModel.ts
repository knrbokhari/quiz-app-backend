import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IRole } from "./RoleModel";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: mongoose.Types.ObjectId | IRole;
  created_at: Date;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  otp?: string;
  expireOtp?: number | Date;
  isVerified: boolean;
  adminApprove: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  otp: {
    type: String,
  },
  expireOtp: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  adminApprove: {
    type: Boolean,
    default: false,
  },
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (user.isModified("password") || user.isNew) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.otp;
    delete ret.expireOtp;
    delete ret.password;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
    return ret;
  },
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
