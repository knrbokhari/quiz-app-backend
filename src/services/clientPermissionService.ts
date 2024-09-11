import ClientPermissionModel from "../model/ClientPermissionModal";
import ClientResourceModel from "../model/ClientResourceModel";
import RoleModel from "../model/RoleModel";

// Find all client permissions
export const findAllClientPermissionsService = async (query: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  try {
    const totalPermissions = await ClientPermissionModel.countDocuments();

    if (Math.ceil(totalPermissions / limit) < page || page <= 0) {
      throw new Error("Invalid page number.");
    }

    const data = await ClientPermissionModel.find()
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

// Find client permission by ID
export const findClientPermissionByIdService = async (id: string) => {
  try {
    const permission = await ClientPermissionModel.findById(id)
      .populate("role")
      .populate("resource");

    if (!permission) {
      throw new Error("Client permission not found.");
    }

    return permission;
  } catch (error) {
    throw error;
  }
};

// Create new client permission
export const createClientPermissionService = async (data: any) => {
  try {
    const { role, resource, access } = data;

    const isExistRole = await RoleModel.findById(role);
    if (!isExistRole) {
      throw new Error("Role not found.");
    }

    const isExistResource = await ClientResourceModel.findById(resource);
    if (!isExistResource) {
      throw new Error("Client Resource not found.");
    }

    const newPermission = await ClientPermissionModel.create({
      role,
      resource,
      access,
    });

    return newPermission;
  } catch (error) {
    throw error;
  }
};

// Update client permission by ID
export const updateClientPermissionService = async (id: string, data: any) => {
  try {
    const isExist = await ClientPermissionModel.findById(id);

    if (!isExist) {
      throw new Error("Client permission not found.");
    }

    const isExistRole = await RoleModel.findById(data.role);
    if (!isExistRole) {
      throw new Error("Role not found.");
    }

    const isExistResource = await ClientResourceModel.findById(data.resource);
    if (!isExistResource) {
      throw new Error("Client Resource not found.");
    }

    const updatedPermission = await ClientPermissionModel.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true },
    );

    return updatedPermission;
  } catch (error) {
    throw error;
  }
};

// Delete client permission by ID
export const deleteClientPermissionService = async (id: string) => {
  try {
    const isExist = await ClientPermissionModel.findById(id);

    if (!isExist) {
      throw new Error("Client permission not found.");
    }

    await ClientPermissionModel.findByIdAndDelete(id);

    return { message: "Client permission deleted successfully" };
  } catch (error) {
    throw error;
  }
};
