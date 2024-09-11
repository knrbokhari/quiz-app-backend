import { FindParams } from "../interface/user.interface";
import ClientResourceModel from "../model/ClientResourceModel";
import { BadRequest, NotFound } from "../utils/error";
import { createSlug } from "../utils/slugHelper";

// Service to get all resources
export const getAllClientResourcesService = async (query: FindParams) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "created_at",
      sortOrder = "desc",
    } = query;

    const total = await ClientResourceModel.countDocuments();

    if (Math.ceil(total / limit) < page || page <= 0) {
      throw new Error("Invalid page number."); //  Please provide a valid page number within the available range.
    }

    const data = await ClientResourceModel.find()
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
export const getClientResourceBySlugService = async (slug: string) => {
  try {
    const isFound = await ClientResourceModel.findOne({ slug: slug });

    if (!isFound) {
      throw new BadRequest("Resource not found!");
    }

    return isFound;
  } catch (error) {
    throw error;
  }
};

// Service to create a new resource
export const createClientResourceService = async (data: { name: string }) => {
  try {
    const slug = createSlug(data.name);
    const isFound = await ClientResourceModel.findOne({ slug });

    if (isFound) {
      throw new BadRequest("Resource with this slug already exists");
    }

    const resource = await ClientResourceModel.create({
      name: data.name,
      slug: slug,
    });

    return resource;
  } catch (error) {
    throw error;
  }
};

// Service to update a resource by slug
export const updateClientResourceService = async (
  slug: string,
  data: { name?: string },
) => {
  try {
    const isFound = await ClientResourceModel.findOne({ slug });

    if (!isFound) {
      throw new NotFound("Resource not found");
    }

    const updatedData: { name?: string; slug?: string } = {};

    if (data.name) {
      updatedData.name = data.name;
      updatedData.slug = createSlug(data.name);
    }

    const existingResource = await ClientResourceModel.findOne({
      slug: updatedData.slug,
    });

    if (existingResource && existingResource.slug !== slug) {
      throw new BadRequest(
        `Resource with this slug "${updatedData.slug}" already exists`,
      );
    }

    const update = await ClientResourceModel.findOneAndUpdate(
      { slug },
      updatedData,
      {
        new: true,
        //   runValidators: true,
      },
    );

    return update;
  } catch (error) {
    throw error;
  }
};

// Service to delete a resource by id
export const deleteClientResourceService = async (id: string) => {
  try {
    const isResource = await ClientResourceModel.findById(id);

    if (!isResource) {
      throw new NotFound("resource not found");
    }

    const deleted = await ClientResourceModel.findByIdAndDelete(isResource?.id);

    return deleted;
  } catch (error) {
    throw error;
  }
};
