import asyncHandler from "../middlewares/asyncHandler";
import {
  findUserById,
  findUserService,
  updateUserService,
} from "../services/authServices";

// @desc user info
export const getUserInfo = asyncHandler(async (req, res) => {
  const result = await findUserById(req.user._id);
  if (result instanceof Error) {
    throw result;
  }
  res.status(200).json({
    success: true,
    message: `User info fetch`,
    data: result,
  });
});

// @desc  user profile info  update
export const userUpdateProfileInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let body = req.body;

  const result = await updateUserService({ userId: req.user._id, data: body });
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: `Update Success`,
    data: result,
  });
});

// @desc  find all user list
export const findAllUsers = asyncHandler(async (req, res) => {
  const result = await findUserService(req.params);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: `Update Success`,
    data: result,
  });
});
