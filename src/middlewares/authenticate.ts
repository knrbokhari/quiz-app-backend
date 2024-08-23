import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import { findUserById } from "../services/authServices";

interface DecodedToken extends JwtPayload {
  id: string;
}

const authenticateRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthenticated request: No token provided",
      });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as DecodedToken;

      const user = await findUserById(decoded.id);
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Unauthenticated request: User not found",
        });
        return;
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  },
);

export default authenticateRequest;
