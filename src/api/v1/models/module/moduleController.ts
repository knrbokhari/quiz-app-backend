import { asyncHandler } from "../../../../middlewares";
import slugCreate from "../../../../utils/slugCreate";
import {
  createModuleService,
  getModuleService,
  getSingleModuleService,
} from "./moduleService";

// @desc    Create new module
// @route   POST /api/module/create
// @access  Private
export const createModule = asyncHandler(async (req: any, res: any) => {
  const result = await createModuleService({
    ...req.body,
    instractor: req.user.id,
    slug: slugCreate(req.body.title),
  });
  if (result instanceof Error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
  res
    .status(200)
    .json({ success: true, message: "Module Details", details: result });
});

// @desc    get module
// @route   GET /api/module?page?&lessonId&courseId
// @access  Private
export const getModule = asyncHandler(async (req: any, res: any) => {
  const result = await getModuleService();

  if (result instanceof Error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
  res
    .status(200)
    .json({ success: true, message: "Get Module Details", details: result });
});

// @desc    get single  module
// @route   GET /api/module/moduleId
// @access  Private
export const getSingleModule = asyncHandler(async (req: any, res: any) => {
  const result = await getSingleModuleService(req.params.moduleId);

  if (result instanceof Error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
  res
    .status(200)
    .json({ success: true, message: "Get Module Details", details: result });
});
