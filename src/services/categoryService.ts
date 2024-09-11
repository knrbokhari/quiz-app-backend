import { FindParams } from "../intergaces/user.interface";
import CategoryModel from "../model/CategoryModel";
import { BadRequest } from "../utils/error";

export const findAllCatagoryService = async (query: FindParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "created_at",
    sortOrder = "desc",
  } = query;

  try {
    const totalUsers = await CategoryModel.countDocuments();

    if (Math.ceil(totalUsers / limit) < page || page <= 0) {
      throw new Error("Invalid page number."); //  Please provide a valid page number within the available range.
    }

    const data = await CategoryModel.find()
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      paginationInfo: {
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
        parPage: limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const findCatagoryBySlugService = async (slug: string) => {
  try {
    const isFound = await CategoryModel.findOne({ slug: slug });

    if (!isFound) {
      throw new BadRequest("Category not found!");
    }

    return isFound;
  } catch (error) {
    throw error;
  }
};
