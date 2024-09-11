export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface VerifyOtp {
  email: string;
  otp: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  reqUserId: string;
}

export interface ForgotPassword {
  email: string;
}
export interface ResetPassword {
  resetPasswordToken: string;
  newPassword: string;
}

export interface FindParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
