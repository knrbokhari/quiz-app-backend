// eslint-disable-next-line import/no-extraneous-dependencies
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";
import UserModel from "../api/v1/models/auth/usersModel";
import asyncHandler from "./asyncHandler";

// Protect Routes
const protect = asyncHandler(async (req: any, res: any, next: NextFunction) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = await UserModel.findById(decoded.id);

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token!" });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Invalid token!" });
  }
});

export default protect;
