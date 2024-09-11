import { FindParams } from "../interface/user.interface";
import CategoryModel from "../model/CategoryModel";
import { BadRequest, NotFound } from "../utils/error";
import { createSlug } from "../utils/slugHelper";

export const findAllCategoryService = async (query: FindParams) => {
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

export const findCategoryBySlugService = async (slug: string) => {
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

export const CreateCategoryService = async ({ name }: CategoryData) => {
  try {
    const slug = createSlug(name);

    const isFound = await CategoryModel.findOne({ slug: slug });

    if (isFound) {
      throw new BadRequest("Category is already exist");
    }

    const category = await CategoryModel.create({
      name,
      slug,
    });

    return category;
  } catch (error) {
    throw error;
  }
};

export const UpdateCategoryService = async ({
  id,
  name,
}: UpdateCategoryData) => {
  try {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new NotFound("Category not found");
    }

    let updatedData: { name?: string; slug?: string } = {};

    if (name) {
      updatedData.name = name;
      updatedData.slug = createSlug(name);
    }

    const isFound = await CategoryModel.findOne({ slug: updatedData?.slug });

    if (isFound) {
      throw new BadRequest(
        `Category with slug "${updatedData.slug}" already exists`,
      );
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        // runValidators: true,
      },
    );

    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

export const DeleteCategoryService = async (id: string) => {
  try {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new NotFound("Category not found");
    }

    const deleted = await CategoryModel.findByIdAndDelete(id);

    return deleted;
  } catch (error) {
    throw error;
  }
};
