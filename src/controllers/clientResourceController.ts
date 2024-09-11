import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import {
  createClientResourceService,
  deleteClientResourceService,
  getAllClientResourcesService,
  getClientResourceBySlugService,
  updateClientResourceService,
} from "../services/clientResourceService";

export const getAllClientResources = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllClientResourcesService(req.query);
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

export const getClientResourceBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getClientResourceBySlugService(req.params.slug);
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

export const createClientResource = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await createClientResourceService(req.body);
    if (result instanceof Error) {
      throw result;
    }

    res.status(201).json({
      success: true,
      message: "Client Resource created successfully",
      data: result,
    });
  },
);

export const updateClientResource = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await updateClientResourceService(req.params.slug, req.body);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Client Resource update successfully",
      data: result,
    });
  },
);

export const deleteClientResource = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await deleteClientResourceService(req.params.id);
    if (result instanceof Error) {
      throw result;
    }

    res.status(200).json({
      success: true,
      message: "Client Resource Delete successfully",
      data: result,
    });
  },
);
