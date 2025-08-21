import { IFile } from "./file";
import { IUser } from "./user";

export interface BlogParams {
  isLoading: boolean;
  errorMessage: string;
  blogList: IBlog[] | null;
}
export interface IBlog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: IFile;
  user_created: IUser;
  date_created: string;
}
