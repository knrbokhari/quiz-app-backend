import UserModel from "../model/UserModel";
import { BadRequest, NotFound } from "../utils/error";
import jwt from "jsonwebtoken";
import generateOtp from "../utils/generateOtp";
import {
  ChangePassword,
  FindParams,
  ForgotPassword,
  ResetPassword,
  UserLogin,
  UserRegister,
  VerifyOtp,
} from "../intergaces/user.interface";

export const registerUserService = async (user: UserRegister) => {
  try {
    const isUser = await UserModel.findOne({ email: user.email });
    if (isUser) throw new BadRequest("Email already exist");

    const otp = generateOtp();
    const expireOtp = Date.now() + Number(process.env.EXPIRE_OTP_TIME);

    // create new user
    await UserModel.create({
      ...user,
      otp,
      expireOtp,
      created_at: new Date(),
    });

    const mailOptions = {
      to: user.email,
      subject: `Quiz App Verification`,
      html: `
            <div style="
            font-family: Helvetica, sans-serif;
            background-color: #f2f2f2;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            ">
  
            <p>Enter this 6 digit code on the sign in page to confirm your identity:</p>
            <p> ${otp}</p>
            </div>
        `,
    };
    if (process.env.NODE_ENV == "PRODUCTION") {
      //   await sendEmailService(mailOptions);
    } else {
      console.log(mailOptions);
    }
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginService = async (user: UserLogin) => {
  try {
    const isUser = await UserModel.findOne({ email: user?.email });

    if (!isUser) {
      throw new BadRequest("Invalid credentials");
    }

    if (!isUser.isVerified) {
      throw new NotFound("User is not verified");
    }

    const isMatch = await isUser.comparePassword(user.password);
    if (!isMatch) {
      throw new BadRequest("Invalid credentials");
    }

    return {};
  } catch (error) {
    throw error;
  }
};

export const verifyOtpService = async (user: VerifyOtp) => {
  try {
    const { email, otp } = user;

    const isUser = await UserModel.findOne({
      email,
      otp,
      expireOtp: { $gt: Date.now() },
    });

    if (!isUser) {
      throw new BadRequest("Invalid credentials or OTP has expired.");
    }

    if (isUser.isVerified) {
      throw new BadRequest("User is already verified.");
    }

    isUser.isVerified = true;
    isUser.otp = undefined; // Clear OTP after successful verification
    isUser.expireOtp = undefined;
    await isUser.save();

    return {};
  } catch (error) {
    if (error instanceof BadRequest) {
      throw error; // Propagate known errors
    }

    throw new Error("An unexpected error occurred during OTP verification.");
  }
};

export const resendService = async (email: string) => {
  try {
    const isUser = await UserModel.findOne({ email: email });
    if (!isUser) throw new BadRequest("Email Not exist");
    const otp = generateOtp();
    isUser.otp = otp;
    isUser.expireOtp = Date.now() + Number(process.env.EXPIRE_OTP_TIME);
    await isUser.save();
    const mailOptions = {
      to: email,
      subject: `Quiz App Verification`,
      html: `
              <div style="
              font-family: Helvetica, sans-serif;
              background-color: #f2f2f2;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              ">
    
              <p>Enter this 6 digit code on the sign in page to confirm your identity:</p>
              <p> ${otp}</p>
              </div>
          `,
    };
    if (process.env.NODE_ENV == "PRODUCTION") {
      //   await sendEmailService(mailOptions);
    } else {
      console.log(mailOptions);
    }
    return isUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findUserById = async (userid: string) => {
  try {
    const user = await UserModel.findById(userid);
    // .select(
    //   "-otp -expireOtp -resetPasswordToken -resetPasswordExpires",
    // );

    if (!user) {
      throw new BadRequest("User not found!");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async ({ userId, data }: any) => {
  try {
    return {};
  } catch (error) {
    throw error;
  }
};

export const changePasswordService = async ({
  oldPassword,
  newPassword,
  reqUserId,
}: ChangePassword) => {
  try {
    const user = await UserModel.findById(reqUserId);
    if (!user) throw new Error("User not found");

    const match = await user.comparePassword(oldPassword);
    if (!match) throw new Error("Old password does not match");

    user.password = newPassword; // Password will be hashed in pre-save hook
    await user.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const forgotPasswordService = async (email: ForgotPassword) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const otp = generateOtp();
    const expireOtp =
      Date.now() + Number(process.env.EXPIRE_OTP_TIME || "3600000"); // Default to 1 hour if not set
    user.otp = otp;
    user.expireOtp = expireOtp;
    await user.save();

    const mailOptions = {
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Helvetica, sans-serif; background-color: #f2f2f2; width: 100%; height: 100%; box-sizing: border-box; margin: 0; padding: 0;">
          <p>Enter this 6 digit code to confirm your identity:</p>
          <p>${otp}</p>
        </div>
      `,
    };

    if (process.env.NODE_ENV === "PRODUCTION") {
      // await sendEmailService(mailOptions);
    } else {
      console.log(mailOptions);
    }

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyForgotRequestOtpService = async ({
  email,
  otp,
}: VerifyOtp) => {
  try {
    const user = await UserModel.findOne({
      email,
      otp,
      expireOtp: { $gt: Date.now() },
    });
    if (!user) throw new Error("Invalid or expired OTP");

    const resetPasswordToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "60m" },
    );

    user.resetPasswordToken = resetPasswordToken;
    await user.save();
    return resetPasswordToken;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const resetPasswordService = async ({
  resetPasswordToken,
  newPassword,
}: ResetPassword) => {
  try {
    const decodedToken = jwt.verify(
      resetPasswordToken,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    // Check if this user exists in the database
    const user = await UserModel.findById(decodedToken.id);

    if (!user) throw new NotFound("User Not Found");

    // check token validity
    const isTokenValid = await UserModel.findOne({
      email: user.email,
      resetPasswordToken,
    });

    if (!isTokenValid) {
      throw new Error("Try again session expired");
    }

    // update password
    user.password = newPassword; // Password will be hashed in pre-save hook
    user.resetPasswordToken = null;
    await user.save();

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findUserService = async (params: FindParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "created_at",
    sortOrder = "desc",
  } = params;

  try {
    const totalUsers = await UserModel.countDocuments();

    if (Math.ceil(totalUsers / limit) < page || page <= 0) {
      throw new Error("Invalid page number."); //  Please provide a valid page number within the available range.
    }

    const users = await UserModel.find()
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      users,
      paginationInfo: {
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
        parPage: limit,
      },
    };
  } catch (error) {
    console.error("Error finding users:", error);
    throw error;
  }
};
