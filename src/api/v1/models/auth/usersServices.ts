import { BadRequest } from "../../../../utils/error";
import { Register } from "./usersInterface";
import UserModel from "./usersModel";
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";

export const registerUserService = async (user: Register) => {
  try {
    const isUser = await UserModel.findOne({ email: user.email });

    if (isUser) throw new BadRequest("Email already exist");

    // Generating salt for hashing password;
    const salt = await bcrypt.genSalt(10);

    // Hashing password before storing for database
    user.password = await bcrypt.hash(user.password, salt);

    // Call user service method for Storing user data
    await UserModel.create(user);

    return true;
  } catch (error) {
    throw error;
  }
};
