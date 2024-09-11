import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import {
  createResourceService,
  deleteResourceService,
  getAllResourcesService,
  getResourceBySlugService,
  updateResourceService,
} from "../services/resourceService";

export const getAllResources = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllResourcesService(req.query);
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

export const getResourceBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getResourceBySlugService(req.params.slug);
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

export const createResource = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await createResourceService(req.body);
    if (result instanceof Error) {
      throw result;
    }

    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: result,
    });
  },
);

export const updateResource = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await updateResourceService(req.params.slug, req.body);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Resource update successfully",
      data: result,
    });
  },
);

export const deleteResource = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await deleteResourceService(req.params.slug);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Resource Delete successfully",
      data: result,
    });
  },
);
