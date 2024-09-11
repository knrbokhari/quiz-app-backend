import { FindParams } from "../intergaces/user.interface";
import CategoryModel from "../model/CategoryModel";

export const findAllCatagoryService = async (params: FindParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "created_at",
    sortOrder = "desc",
  } = params;

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
