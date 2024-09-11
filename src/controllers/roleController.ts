import { Request, Response } from "express";
import {
  createRoleService,
  getAllRolesService,
  getRoleBySlugService,
  updateRoleService,
  deleteRoleService,
} from "../services/roleService";
import asyncHandler from "../middlewares/asyncHandler";

export const getAllRoles = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllRolesService(req.query);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: "successfully",
    data: result,
  });
});

export const getRoleBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getRoleBySlugService(req.params.slug);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "successfully",
      data: result,
    });
  },
);

export const createRole = asyncHandler(async (req: Request, res: Response) => {
  const result = await createRoleService(req.body);
  if (result instanceof Error) {
    throw result;
  }

  res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: result,
  });
});

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const result = await updateRoleService(req.params.slug, req.body);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: "Role update successfully",
    data: result,
  });
});

export const deleteRole = asyncHandler(async (req: Request, res: Response) => {
  const result = await deleteRoleService(req.params.slug);
  if (result instanceof Error) {
    throw result;
  }

  res.status(200).json({
    success: true,
    message: "successfully",
    data: result,
  });
});
