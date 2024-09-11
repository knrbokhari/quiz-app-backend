import { Types } from "mongoose";
import ApiPermissionModel from "../model/ApiPermissionModel";
import ResourceModel from "../model/ResourceModel";
import RoleModel from "../model/RoleModel";

export const getAllPermissionsServices = async (query: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  try {
    const totalPermissions = await ApiPermissionModel.countDocuments();

    if (Math.ceil(totalPermissions / limit) < page || page <= 0) {
      throw new Error("Invalid page number.");
    }

    const data = await ApiPermissionModel.find()
      .populate("role")
      .populate("resource")
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      paginationInfo: {
        totalPages: Math.ceil(totalPermissions / limit),
        currentPage: page,
        totalPermissions,
        perPage: limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Get permission by ID
export const getPermissionByIdServices = async (id: string) => {
  try {
    const permission = await ApiPermissionModel.findById(id)
      .populate("role")
      .populate("resource");

    if (!permission) {
      throw new Error("Permission not found.");
    }

    return permission;
  } catch (error) {
    throw error;
  }
};

// Create new permission
export const createPermissionServices = async (data: any) => {
  try {
    const { role, resource, actions, access } = data;

    const isExistRole = await RoleModel.findById(role);

    if (!isExistRole) {
      throw new Error("Role not found.");
    }

    const isExistResource = await ResourceModel.findById(resource);

    if (!isExistResource) {
      throw new Error("Resource not found.");
    }

    const newPermission = await ApiPermissionModel.create({
      role,
      resource,
      actions,
      access,
    });

    return newPermission;
  } catch (error) {
    throw error;
  }
};

// Update permission by ID
export const updatePermissionServices = async (id: string, data: any) => {
  try {
    const isExist = await ApiPermissionModel.findById(id);

    if (!isExist) {
      throw new Error("Permission not found.");
    }

    const isExistRole = await RoleModel.findById(data.role);

    if (!isExistRole) {
      throw new Error("Role not found.");
    }

    const isExistResource = await ResourceModel.findById(data.resource);

    if (!isExistResource) {
      throw new Error("Resource not found.");
    }

    const updatedPermission = await ApiPermissionModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedPermission) {
      throw new Error("Permission not found.");
    }
    return updatedPermission;
  } catch (error) {
    throw error;
  }
};

// Delete permission by ID
export const deletePermissionServices = async (id: string) => {
  try {
    const isExist = await ApiPermissionModel.findById(id);

    if (!isExist) {
      throw new Error("Permission not found.");
    }

    await ApiPermissionModel.findByIdAndDelete(id);

    return { message: "Permission deleted successfully" };
  } catch (error) {
    throw error;
  }
};
