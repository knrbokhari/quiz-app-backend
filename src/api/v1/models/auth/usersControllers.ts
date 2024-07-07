import asyncHandler from "../../../../middlewares/asyncHandler";
import sendTokenResponse from "../../../../utils/sendTokenResponse";

// @desc    Register
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: any, res: any) => {
  const isSuccess = {};

  if (isSuccess instanceof Error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }

  res.status(200).json({
    success: true,
    message: `Please check your email ${req.body.email} to complete the verification process`,
  });
});

// @desc    verifyUser
// @route   POST /api/auth/verifyUser
// @access  Public
export const verifyUser = asyncHandler(async (req: any, res: any) => {
  const token = req.params.registerToken;
  const user = {};

  if (user instanceof Error) {
    return res.status(500).json({ success: false, ...user });
  }

  sendTokenResponse(user, 201, res, "User Verification successful");
});

// @desc    Login
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const user: any = {};

  if (user instanceof Error) {
    return res.status(500).json({ success: true, ...user });
  }

  sendTokenResponse(user, 200, res, "User Login successful");
});

// @desc    currentUser
// @route   POST /api/auth/me
// @access  Private
export const currentUser = asyncHandler(async (req: any, res: any) => {
  const user = {};

  if (user instanceof Error) {
    return res.status(500).json({ success: true, ...user });
  }

  res.status(200).json({ success: true, message: "User Details", user });
});

// @desc    Update user
// @route   POST /api/auth/update/
// @access  Private
export const updateUser = asyncHandler(async (req: any, res: any) => {
  const { _id } = req.user;
  const data = req.body;
  const user = {};

  if (user instanceof Error) {
    return res.status(500).json({ success: true, ...user });
  }

  res
    .status(200)
    .json({ success: true, message: "User update successful", user });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req: any, res: any) => {
  const { email } = req.body;
  const user = {};

  if (user instanceof Error) {
    return res.status(500).json({ success: true, ...user });
  }

  res.status(200).json({
    success: true,
    message: "Password reset link sent to your email",
  });
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req: any, res: any) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = {};

  if (user instanceof Error) {
    return res.status(500).json({ success: true, ...user });
  }

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req: any, res: any) => {
  const { currentPassword, newPassword } = req.body;
  const { _id } = req.user;

  const user = {};

  if (user instanceof Error) {
    return res.status(500).json({ success: true, ...user });
  }

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});
