import asyncHandler from "../middlewares/asyncHandler";
import { findAllCatagoryService } from "../services/categoryService";

// @desc  find all user list
export const findAllCatagory = asyncHandler(async (req, res) => {
  const result = await findAllCatagoryService(req.params);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: `Success`,
    data: result,
  });
});
