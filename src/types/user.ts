import { IFile } from "./file";

export interface AuthParams {
  isLoading: boolean;
  errorMessage: string;
  userInfo: IUser | null;
  access_token: string | null;
  refresh_token: string | null;
  expires: number | null;
  expires_at;
}
export interface IUser {
  avatar: IFile;
  // active: string;
  createdAt: string;
  email: string;
  // isRegisteredWithGoogle: boolean;
  updatedAt: string;
  userName: string;
  userType: string;
  first_name: string;
  last_name: string;
  phone: string;
  status: string;
  id: string;
}
