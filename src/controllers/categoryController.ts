import asyncHandler from "../middlewares/asyncHandler";
import {
  findAllCatagoryService,
  findCatagoryBySlugService,
} from "../services/categoryService";

// @desc  find all catagory list
export const findAllCatagory = asyncHandler(async (req, res) => {
  const result = await findAllCatagoryService(req.query);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: `Success`,
    data: result,
  });
});

// @desc  find a catagory
export const findCatagoryBySlug = asyncHandler(async (req, res) => {
  const result = await findCatagoryBySlugService(req.params.slug);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: `Success`,
    data: result,
  });
});
