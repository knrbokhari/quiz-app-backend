import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import {
  createPermissionServices,
  deletePermissionServices,
  getAllPermissionsServices,
  getPermissionByIdServices,
  updatePermissionServices,
} from "../services/apiPermissionServices";

// Get all API permissions
export const getAllPermissions = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllPermissionsServices(req.query);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Permissions fetched successfully",
      data: result,
    });
  },
);

// Get permission by ID
export const getPermissionById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getPermissionByIdServices(id);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Permission fetched successfully",
      data: result,
    });
  },
);

// Create new permission
export const createPermission = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await createPermissionServices(req.body);
    if (result instanceof Error) {
      throw result;
    }

    res.status(201).json({
      success: true,
      message: "Permission created successfully",
      data: result,
    });
  },
);

// Update permission by ID
export const updatePermission = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await updatePermissionServices(id, req.body);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Permission updated successfully",
      data: result,
    });
  },
);

// Delete permission by ID
export const deletePermission = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await deletePermissionServices(req.params.id);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: `Permission Delete successfully`,
      data: result,
    });
  },
);
