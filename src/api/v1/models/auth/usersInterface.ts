export interface IUser {
  full_name: string;
  email: string;
  password: string;
  user_type: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
}
