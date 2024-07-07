/* eslint-disable import/no-extraneous-dependencies */
import { BadRequest, NotFound } from "../../../../utils/error";
import sendEmail from "../../../../utils/sendEmail";
import { Login, Register, UpdateUser } from "./usersInterface";
import UserModel from "./usersModel";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerUserService = async (user: Register) => {
  try {
    // Check if user already exists
    const isUser = await UserModel.findOne({ email: user.email });
    if (isUser) {
      throw new BadRequest("Email already exists");
    }

    // Generate email verification token
    const registerToken = JWT.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE_VERIFICATION,
    });

    // Determine client host based on environment
    const host =
      process.env.NODE_ENV === "prod"
        ? process.env.CLIENT_HOST
        : process.env.CLIENT_DEV_HOST;

    // Create verification URL
    const verificationURL = `${host}/verify/${registerToken}`;

    // Prepare email message
    const message = `Please click the link below to complete your signup process:\n\n${verificationURL}`;

    await sendEmail({
      email: user.email,
      name: user.full_name,
      verificationURL,
      subject: "Account verification",
      message,
      isRegisterMail: true,
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (user: Login) => {
  try {
    const isUser = await UserModel.findOne({ email: user.email });

    if (!isUser) {
      throw new BadRequest("The user doesn’t exist");
    }

    const isMatch = await bcrypt.compare(user.password, isUser.password);
    if (!isMatch) {
      throw new BadRequest("Invalid credentials");
    }

    return isUser;
  } catch (error) {
    throw error;
  }
};

export const verifyUserService = async (token: string) => {
  try {
    // Taking registerToken from URL parameter
    if (!token.startsWith("eyJ")) {
      throw new BadRequest("Invalid verification token");
    }

    // Decode that JWT token
    const decoded: any = JWT.verify(token, process.env.JWT_SECRET!);

    const isUser = await UserModel.findOne({ email: decoded.user.email });

    if (isUser) throw new BadRequest("Already verified");

    // Generating salt for hashing password;
    const salt = await bcrypt.genSalt(10);

    // Hashing password before storing for database
    decoded.user.password = await bcrypt.hash(decoded.user.password, salt);

    // Check if this user already verified
    const isUserExisted = await UserModel.findOne({
      email: decoded.user.email,
    });

    if (isUserExisted)
      throw new BadRequest("You have already verified your account");

    // Hash password before storing in database
    decoded.user.password = await bcrypt.hash(decoded.user.password, salt);

    // Create new user in the database
    const newUser = await UserModel.create(decoded.user);

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const findUserService = async (_id: string) => {
  try {
    // Check if this user exists in the database
    const user = await UserModel.findById(_id);
    if (!user) throw new NotFound("User Not Found");
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async ({
  _id,
  data,
}: {
  _id: string;
  data: UpdateUser;
}) => {
  try {
    // Check if this user exists in the database
    const isUser = await UserModel.findById(_id);

    if (!isUser) throw new NotFound("User Not Found");

    // Call user service method for updating user data
    const user = await UserModel.findByIdAndUpdate(_id, data, { new: true });

    // finally send updated user
    return user;
  } catch (error) {
    throw error;
  }
};
