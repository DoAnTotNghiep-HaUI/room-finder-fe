import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import authReducer from "./auth/store";
import roomReducer from "./room/store";
import roomTypeReducer from "./room-type/store";
import roomDetailReducer from "./room-detail/store";
import conversationReducer from "./conversation/store";
import conversationDetailReducer from "./conversation-detail/store";
import chatSocketReducer from "./chat/store";
import messageReducer from "./message/store";
import funituresReducer from "./furnitures/store";
import amenitiesReducer from "./amenities/store";
import districtsReducer from "./districts/store";
import blogReducer from "./blog/store";

const rootReduce = combineReducers({
  auth: authReducer,
  room: roomReducer,
  roomDetail: roomDetailReducer,
  conversation: conversationReducer,
  conversationDetail: conversationDetailReducer,
  chatSocket: chatSocketReducer,
  message: messageReducer,
  roomType: roomTypeReducer,
  furnitures: funituresReducer,
  amenities: amenitiesReducer,
  districts: districtsReducer,
  blog: blogReducer,
});
const store = configureStore({ reducer: rootReduce });

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof rootReduce>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
export type AppStore = typeof store;
