import { FindParams } from "../interface/user.interface";
import ResourceModel from "../model/ResourceModel";
import { BadRequest, NotFound } from "../utils/error";
import { createSlug } from "../utils/slugHelper";

// Service to get all resources
export const getAllResourcesService = async (query: FindParams) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "created_at",
      sortOrder = "desc",
    } = query;

    const total = await ResourceModel.countDocuments();

    if (Math.ceil(total / limit) < page || page <= 0) {
      throw new Error("Invalid page number."); //  Please provide a valid page number within the available range.
    }

    const data = await ResourceModel.find()
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      paginationInfo: {
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalUsers: total,
        parPage: limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Service to get resource by slug
export const getResourceBySlugService = async (slug: string) => {
  try {
    const isFound = await ResourceModel.findOne({ slug: slug });

    if (!isFound) {
      throw new BadRequest("Resource not found!");
    }

    return isFound;
  } catch (error) {
    throw error;
  }
};

// Service to create a new resource
export const createResourceService = async (data: { name: string }) => {
  try {
    const slug = createSlug(data.name);
    const isFound = await ResourceModel.findOne({ slug });

    if (isFound) {
      throw new BadRequest("Resource with this slug already exists");
    }

    const resource = await ResourceModel.create({
      name: data.name,
      slug: slug,
    });

    return resource;
  } catch (error) {
    throw error;
  }
};

// Service to update a resource by slug
export const updateResourceService = async (
  slug: string,
  data: { name?: string },
) => {
  try {
    const isFound = await ResourceModel.findOne({ slug });

    if (!isFound) {
      throw new NotFound("Resource not found");
    }

    const updatedData: { name?: string; slug?: string } = {};

    if (data.name) {
      updatedData.name = data.name;
      updatedData.slug = createSlug(data.name);
    }

    const existingResource = await ResourceModel.findOne({
      slug: updatedData.slug,
    });

    if (existingResource && existingResource.slug !== slug) {
      throw new BadRequest(
        `Resource with this slug "${updatedData.slug}" already exists`,
      );
    }

    const update = await ResourceModel.findOneAndUpdate({ slug }, updatedData, {
      new: true,
      //   runValidators: true,
    });

    return update;
  } catch (error) {
    throw error;
  }
};

// Service to delete a resource by id
export const deleteResourceService = async (id: string) => {
  try {
    const isResource = await ResourceModel.findById(id);

    if (!isResource) {
      throw new NotFound("resource not found");
    }

    const deleted = await ResourceModel.findByIdAndDelete(isResource?.id);

    return deleted;
  } catch (error) {
    throw error;
  }
};
