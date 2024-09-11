import asyncHandler from "../middlewares/asyncHandler";
import {
  CreateCategoryService,
  findAllCategoryService,
  findCategoryBySlugService,
} from "../services/categoryService";

// @desc  find all category list
export const findAllCategory = asyncHandler(async (req, res) => {
  const result = await findAllCategoryService(req.query);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: `Success`,
    data: result,
  });
});

// @desc  find a category
export const findCategoryBySlug = asyncHandler(async (req, res) => {
  const result = await findCategoryBySlugService(req.params.slug);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: `Success`,
    data: result,
  });
});

// @desc  Create a category
export const CreateCategory = asyncHandler(async (req, res) => {
  const result = await CreateCategoryService(req.body);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
