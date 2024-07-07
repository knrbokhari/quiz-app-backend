import { BadRequest } from "../../../../utils/error";
import ModuleModel from "../module/moduleModel";
import QuestionModel from "./questionModel";

export const createQuestionService = async (body: any) => {
  try {
    const result = await QuestionModel.findOne({
      slug: body.slug,
      moduleId: body.moduleId,
    });

    if (result) {
      throw new BadRequest("Already Created");
    }

    const created = await QuestionModel.create(body);
    await ModuleModel.findByIdAndUpdate(body.moduleId, {
      $push: { question: created._id },
    });

    return created;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getQuestionService = async (req: any) => {
  try {
    const result = await QuestionModel.find({
      slug: req.parrem.slug,
    });

    if (!result) {
      throw new BadRequest("Question not found");
    }
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
