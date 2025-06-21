import { IFile } from "./file";

export interface IPhoto {
  directus_files_id: IFile;
  room_id: string;
  id: string;
}
