import { BadRequest } from "../../../../utils/error";
import ModuleModel from "./moduleModel";

export const createModuleService = async (body: any) => {
  try {
    const result = await ModuleModel.findOne({
      slug: body.slug,
    });

    if (result) {
      throw new BadRequest("Already Created");
    }

    const created = await ModuleModel.create(body);

    return created;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getModuleService = async () => {
  const allData = await ModuleModel.find().populate({
    path: "question",
    model: "question",
  });

  return allData;
};

export const getSingleModuleService = async (moduleId: string) => {
  try {
    const result = await ModuleModel.findOne({ slug: moduleId }).populate({
      path: "question",
      model: "question",
    });

    if (!result) {
      throw new BadRequest("module not found");
    }
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
