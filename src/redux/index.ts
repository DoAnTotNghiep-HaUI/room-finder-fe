import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import authReducer from "./auth/store";
import roomReducer from "./room/store";
import roomDetailReducer from "./room-detail/store";
import conversationReducer from "./conversation/store";
import conversationDetailReducer from "./conversation-detail/store";

import messageReducer from "./message/store";

const rootReduce = combineReducers({
  auth: authReducer,
  room: roomReducer,
  roomDetail: roomDetailReducer,
  conversation: conversationReducer,
  conversationDetail: conversationDetailReducer,
  message: messageReducer,
});
const store = configureStore({ reducer: rootReduce });

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof rootReduce>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
export type AppStore = typeof store;
