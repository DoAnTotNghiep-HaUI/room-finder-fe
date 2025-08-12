import { IBuilding } from "./buidling";
import { IFile } from "./file";

export interface RoomParams {
  isLoading: boolean;
  errorMessage: string;
  roomList: IRoom[] | null;
}
export interface RoomDetailParams {
  isLoading: boolean;
  errorMessage: string;
  roomDetail: IRoom | null;
}
export interface IRoom {
  id: string;
  title: string;
  room_type: IRoomType;
  furniture: Record<string, boolean | string | number>;
  amenities: Record<string, boolean | string | number>;
  video: IFile;
  photos: {
    directus_files_id: IFile[];
  };
  rental_object: string;
  limit_people: number;
  description: string;
  constract_duration: string;
  contract?: any;
  number_room: number;
  floor: number;
  room_price: number;
  acreage: number;
  viewCount?: number;
  building: IBuilding;
  review: any;
  date_created: string;
}
export interface IRoomType {
  id: string;
  name: string;
}
