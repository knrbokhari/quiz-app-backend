import { Response } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import JWT from "jsonwebtoken";

interface TokenResponse {
  success: boolean;
  user: any;
  token: string;
  message: string;
}

const sendTokenResponse = (
  user: any,
  statusCode: number,
  res: Response,
  message: string,
): void => {
  // Create token
  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE_LOGIN,
  });

  // Sending response with the token
  const response: TokenResponse = { success: true, user, token, message };
  res.status(statusCode).json(response);
};

export default sendTokenResponse;
