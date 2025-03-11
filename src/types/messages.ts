export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: "text" | "image" | "link";
  timestamp: Date;
  read: boolean;
  reactions?: string[];
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
