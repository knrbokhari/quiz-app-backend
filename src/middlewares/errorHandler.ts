/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { GeneralError } from "../utils/error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof GeneralError) {
    const code = err.getCode();
    return res
      .status(code)
      .json({ name: err.name, msg: err.message, status: false });
  }
  return res.status(500).json({
    name: "internal server error",
    msg:
      process.env.NODE_ENV === "PRODUCTION"
        ? "Something went wrong, please contact us"
        : err.message,
    status: false,
  });
};
