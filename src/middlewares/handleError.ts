require("dotenv").config();
import { Request, Response } from "express";
import { GeneralError } from "../utils/error";

interface CustomError extends Error {
  getCode?: () => number;
}

const errorHandler = async (
  err: CustomError,
  req: Request,
  res: Response,
  // next: NextFunction,
) => {
  console.log(err, "errorHandler");

  if (err instanceof GeneralError) {
    const code = err.getCode ? err.getCode() : 500;

    return res.status(code).json({
      name: err.name,
      message: err.message,
      success: false,
    });
  }

  if (err.name === "CastError") {
    // eslint-disable-next-line no-param-reassign
    err.message = "Invalid ObjectId";
  }

  return res.status(500).json({
    name: "internal server error",
    message:
      process.env.NODE_ENV === "PRODUCTION"
        ? `Something went wrong, please contact to admin`
        : err.message,
    success: false,
  });
};

export default errorHandler;
