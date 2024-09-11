import { FindParams } from "../interface/user.interface";
import RoleModel from "../model/RoleModel";
import { BadRequest, NotFound } from "../utils/error";
import { createSlug } from "../utils/slugHelper";

// Service to get all roles
export const getAllRolesService = async (query: FindParams) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "created_at",
      sortOrder = "desc",
    } = query;

    const total = await RoleModel.countDocuments();

    if (Math.ceil(total / limit) < page || page <= 0) {
      throw new Error("Invalid page number."); //  Please provide a valid page number within the available range.
    }

    const data = await RoleModel.find()
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

// Service to get role by slug
export const getRoleBySlugService = async (slug: string) => {
  try {
    const isFound = await RoleModel.findOne({ slug: slug });

    if (!isFound) {
      throw new BadRequest("Role not found!");
    }

    return isFound;
  } catch (error) {
    throw error;
  }
};

// Service to create a new role
export const createRoleService = async (data: { name: string }) => {
  try {
    const slug = createSlug(data.name);
    const isFound = await RoleModel.findOne({ slug });

    if (isFound) {
      throw new BadRequest("Role with this slug already exists");
    }

    const role = await RoleModel.create({
      name: data.name,
      slug: slug,
    });

    return role;
  } catch (error) {
    throw error;
  }
};

// Service to update a role by slug
export const updateRoleService = async (
  slug: string,
  data: { name?: string },
) => {
  try {
    const isFound = await RoleModel.findOne({ slug });

    if (!isFound) {
      throw new NotFound("Role not found");
    }

    const updatedData: { name?: string; slug?: string } = {};

    if (data.name) {
      updatedData.name = data.name;
      updatedData.slug = createSlug(data.name);
    }

    const existingRole = await RoleModel.findOne({ slug: updatedData.slug });

    if (existingRole && existingRole.slug !== slug) {
      throw new BadRequest(
        `Role with this slug "${updatedData.slug}" already exists`,
      );
    }

    const update = await RoleModel.findOneAndUpdate({ slug }, updatedData, {
      new: true,
      //   runValidators: true,
    });

    return update;
  } catch (error) {
    throw error;
  }
};

// Service to delete a role by id
export const deleteRoleService = async (id: string) => {
  try {
    const isRole = await RoleModel.findById(id);

    if (!isRole) {
      throw new NotFound("Role not found");
    }

    const deleted = await RoleModel.findByIdAndDelete(isRole?.id);

    return deleted;
  } catch (error) {
    throw error;
  }
};
