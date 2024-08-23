import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import {
  changePasswordService,
  forgotPasswordService,
  loginService,
  registerUserService,
  resendService,
  resetPasswordService,
  verifyForgotRequestOtpService,
  verifyOtpService,
} from "../services/authServices";
import sendTokenResponse from "../utils/sendTokenResponse";

// @desc Register for client
export const registration = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await registerUserService(req.body);
    if (result instanceof Error) {
      throw result;
    }
    res.status(201).json({
      success: true,
      message: `Send a OTP to your email`,
    });
  },
);

// @desc verify Otp
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const result = await verifyOtpService(req.body);
  if (result instanceof Error) {
    throw result;
  }
  sendTokenResponse({
    user: result,
    statusCode: 200,
    res,
    message: "OTP verify successful",
  });
});

// @desc Login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginService(req.body);
  if (result instanceof Error) {
    throw result;
  }
  res.status(200).json({
    success: true,
    message: `Send a OTP to your email`,
  });
});

// @desc Resend otp
export const resend = asyncHandler(async (req: Request, res: Response) => {
  const result = await resendService(req.body);
  if (result instanceof Error) {
    throw result;
  }
  res.status(200).json({
    success: true,
    message: `Send a OTP to your email`,
  });
});

// @desc Change password
export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await changePasswordService({
      ...req.body,
      reqUserId: req.user._id,
    });

    if (result instanceof Error) {
      throw result;
    }

    return res
      .status(200)
      .json({ success: true, message: "Password update success" });
  },
);

// @desc Forgot Password
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await forgotPasswordService(req.body.email);
    if (result instanceof Error) {
      throw result;
    }
    return res
      .status(200)
      .json({ success: true, message: "Email has been sent" });
  },
);

// @desc Forgot Password Request OTP Verify
export const verifyForgotRequestOtp = asyncHandler(
  async (req: Request, res: Response) => {
    const result: any = await verifyForgotRequestOtpService(req.body);
    if (result instanceof Error) {
      throw result;
    }
    return res.status(200).json({
      success: true,
      resetPasswordToken: result,
      message: "OTP Verify Success",
    });
  },
);

// @desc Reset Password
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await resetPasswordService({
      resetPasswordToken: req.params.resetPasswordToken,
      newPassword: req.body.password as string,
    });
    if (result instanceof Error) {
      throw result;
    }
    sendTokenResponse({ user: result, statusCode: 200, res });
  },
);
