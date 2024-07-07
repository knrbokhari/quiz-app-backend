import { asyncHandler } from "../../../../middlewares";
import slugCreate from "../../../../utils/slugCreate";
import { createQuestionService, getQuestionService } from "./questionService";

// @desc    Create question
// @route   POST /api/question/create
// @access  Private
export const createQuestion = asyncHandler(async (req: any, res: any) => {
  const result = await createQuestionService({
    ...req.body,
    slug: slugCreate(req.body.question),
  });
  if (result instanceof Error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
  res
    .status(200)
    .json({ success: true, message: "Question Details", details: result });
});

// @desc    get question
// @route   GET /api/question/moduleId
// @access  Private
export const getQuestion = asyncHandler(async (req: any, res: any) => {
  const result = await getQuestionService(req);

  if (result instanceof Error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
  res
    .status(200)
    .json({ success: true, message: "Get QUESTION Details", result });
});
