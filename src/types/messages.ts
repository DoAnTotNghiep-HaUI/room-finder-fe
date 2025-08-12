import { IFile } from "./file";
import { IUser } from "./user";

export interface IMessage {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  attachments?: IFile[];
  type: "text" | "file" | "link";
  reactions?: string[];
  status: "sent" | "delivered" | "read";
  conversation: string;
  date_created: string;
  user_created: IUser;
}
export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
  messageId: string;
}
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
}
