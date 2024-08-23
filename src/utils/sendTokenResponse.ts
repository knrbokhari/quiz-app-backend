import jwt from "jsonwebtoken";
import { Response } from "express";

interface Props {
  user: any;
  statusCode: number;
  res: Response;
  message?: string;
}

const sendTokenResponse = ({
  user,
  statusCode,
  res,
  message = "Success",
}: Props) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRE_LOGIN,
    },
  );

  res.status(statusCode).json({ success: true, token, message });
};

export default sendTokenResponse;
