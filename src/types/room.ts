import { IBuilding } from "./buidling";
import { IFile } from "./file";

export interface RoomParams {
  isLoading: boolean;
  errorMessage: string;
  roomList: IRoom[] | null;
  roomNewPost: IRoom[] | null;
  roomCheapPrice: IRoom[] | null;
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
  deposit: number;
  services: IService[];
  furnitures: IFurniture[];
  amenities: IAmenity[];
  video: IFile;
  photos: IFile[];
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
export interface IService {
  id: string;
  name: string;
  default_price: number;
  unit: string;
  icon: IFile;
}
export interface IFurniture {
  id: string;
  name: string;
  icon: IFile;
}
export interface IAmenity {
  id: string;
  name: string;
  icon: IFile;
}
