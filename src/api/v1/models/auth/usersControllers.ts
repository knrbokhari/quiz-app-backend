/* eslint-disable @typescript-eslint/naming-convention */
import asyncHandler from "../../../../middlewares/asyncHandler";
import sendTokenResponse from "../../../../utils/sendTokenResponse";
import { Login, Register } from "./usersInterface";
import {
  findUserService,
  loginService,
  registerUserService,
  updateUserService,
  verifyUserService,
} from "./usersServices";

// @desc    Register
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: any, res: any) => {
  const { email, password, full_name }: Register = req.body;

  const user: any = await registerUserService({
    email,
    password,
    full_name,
  });

  if (user instanceof Error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }

  res.status(200).json({
    success: true,
    // message: `Please check your email ${user.email} to complete the verification process`,
    message: `User Register successful`,
  });
});

// @desc    verifyUser
// @route   POST /api/auth/verifyUser
// @access  Public
export const verifyUser = asyncHandler(async (req: any, res: any) => {
  const token = req.params.registerToken;
  const user = await verifyUserService(token);

  if (user instanceof Error) {
    return res.status(500).json({ success: false, ...user });
  }

  sendTokenResponse(user, 201, res, "User Verification successful");
});

// @desc    Login
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: any, res: any) => {
  const { email, password }: Login = req.body;

  const user = await loginService({ email, password });

  if (user instanceof Error) {
    console.log(user, "63");

    return res.status(500).json({ success: false });
  }

  sendTokenResponse(user, 200, res, "User Login successful");
});

// @desc    currentUser
// @route   POST /api/auth/me
// @access  Private
export const currentUser = asyncHandler(async (req: any, res: any) => {
  const user = await findUserService(req.user._id);

  if (user instanceof Error) {
    return res.status(500).json({ success: false });
  }

  res.status(200).json({ success: true, message: "User Details", user });
});

// @desc    Update user
// @route   POST /api/auth/update/
// @access  Private
export const updateUser = asyncHandler(async (req: any, res: any) => {
  const { _id } = req.user;
  const data = req.body;
  const user = await updateUserService({ _id, data });

  if (user instanceof Error) {
    return res.status(500).json({ success: false });
  }

  res
    .status(200)
    .json({ success: true, message: "User update successful", user });
});
