import { Request, Response } from "express";
import {
  findAllClientPermissionsService,
  findClientPermissionByIdService,
  createClientPermissionService,
  updateClientPermissionService,
  deleteClientPermissionService,
} from "../services/clientPermissionService";
import asyncHandler from "../middlewares/asyncHandler";

// Get all client permissions
export const getAllClientPermissions = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await findAllClientPermissionsService(req.query);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Client permissions fetched successfully",
      data: result,
    });
  },
);

// async (req: Request, res: Response) => {
//   try {
//     const result = await findAllClientPermissions(req.query);
//     res.status(200).json({
//       success: true,
//       message: "Client permissions fetched successfully",
//       data: result.data,
//       pagination: result.paginationInfo,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Get client permission by ID
export const getClientPermissionById = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result = await findClientPermissionByIdService(slug);

    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Client permission fetched successfully",
      data: result,
    });
  },
);

// Create new client permission
export const createClientPermissionController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await createClientPermissionService(req.body);

    if (result instanceof Error) {
      throw result;
    }
    res.status(201).json({
      success: true,
      message: "Client permission created successfully",
      data: result,
    });
  },
);

// Update client permission by ID
export const updateClientPermissionController = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result = await updateClientPermissionService(slug, req.body);

    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Client permission updated successfully",
      data: result,
    });
  },
);

// Delete client permission by ID
export const deleteClientPermissionController = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result = await deleteClientPermissionService(slug);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: result.message,
    });
  },
);
