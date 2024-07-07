export interface IUser {
  full_name: string;
  email: string;
  password: string;
  user_type: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
}

export interface Register {
  full_name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
