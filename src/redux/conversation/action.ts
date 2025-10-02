import { IConversation } from "@/types/chat";
import { IUser } from "@/types/user";
import directus from "@/utils/directus";
import { createItem, readItem, readItems, updateItem } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "..";
import { openTempConversation, setConversationId } from "./store";
import { getConversationById } from "../conversation-detail/action";

export const checkConversationExists = createAsyncThunk(
  "conversation/checkConversationExists",
  async ({ userId1, userId2 }: { userId1: string; userId2: string }) => {
    try {
      // 1. Lấy tất cả conversation có participant là userId1 hoặc userId2
      const response = await directus.request(
        readItems("conversation", {
          fields: ["*", "participants.directus_users_id.id"],
          filter: {
            participants: {
              directus_users_id: { _in: [userId1, userId2] },
            },
          },
        })
      );
      const filtered = (response as any[]).filter((conv) => {
        if (!conv.participants || conv.participants.length !== 2) return false;
        const ids = conv.participants.map((p: any) => p.directus_users_id?.id);
        return (
          ids.includes(userId1) && ids.includes(userId2) && ids.length === 2
        );
      });

      // Trả về 1 conversation đầu tiên nếu có
      return filtered.length > 0 ? [filtered[0]] : [];
    } catch (error) {
      console.error("Error checking conversation:", error);
      throw error;
    }
  }
);
export const getListConversationByUserId = createAsyncThunk(
  "conversation/getListConversationByUserId",
  async (userId: string) => {
    try {
      const res = await directus.request(
        readItems("conversation", {
          fields: [
            "*",
            "last_message.*",
            "participants.*",
            "participants.directus_users_id.*",
            "participants.directus_users_id.avatar.*",
          ],
          filter: {
            participants: {
              directus_users_id: {
                _eq: userId,
              },
            },
          },
          sort: ["-last_message_time"],
        })
      );
      return res as IConversation[];
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
// export const getConversationById = createAsyncThunk(
//   "conversation/getConversationById",
//   async (conversationId: string) => {
//     try {
//       const res = await directus.request(
//         readItem("conversation", conversationId, {
//           fields: [
//             "*",
//             "last_message.*",
//             "participants.*",
//             "participants.directus_users_id.*",
//             "participants.directus_users_id.avatar.*",
//           ],
//         })
//       );
//       return res as IConversation[];
//     } catch (error) {
//       //   return rejectWithValue(error);
//       console.log("error", error);
//     }
//   }
// );
// export const getConversationPartner = createAsyncThunk(
//   "conversation/getConversationPartner",
//   async ({conversation, userInfo}: {conversation: IConversation, userInfo: IUser}) => {
//     try {
//       return (
//         conversation.participants.find(
//           (participant) => participant?.directus_users_id?.id !== userInfo?.id
//         )?.id || ""
//       );
//     } catch (error) {
//       //   return rejectWithValue(error);
//       console.log("error", error);
//     }
//   }
// );
export const createConversation = createAsyncThunk(
  "conversation/createConversation",
  async (data: any) => {
    try {
      const res = await directus.request(createItem("conversation", data));
      return res;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
export const updateConversation = createAsyncThunk(
  "conversation/updateConversation",
  async (conversationId: string, data: any) => {
    try {
      const res = await directus.request(
        updateItem("conversation", conversationId, data)
      );
      return res;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
export const openChatWithUser = createAsyncThunk(
  "conversation/openChatWithUser",
  async (partnerId: string, { getState, dispatch }) => {
    const state = getState() as AppState;
    const { conversations } = state.conversation;
    if (state.conversation.conversations.length === 0) {
      await dispatch(getListConversationByUserId(state.auth.userInfo?.id!));
    }

    // Tìm conversation đã tồn tại
    const existingConv = conversations.find((conv) =>
      conv.participants.some((p) => p.directus_users_id?.id === partnerId)
    );
    console.log("existingConv", existingConv);

    if (existingConv) {
      // Nếu đã có conversation, mở luôn cửa sổ chat với conversation đó
      dispatch(setConversationId(existingConv?.id));
      return { isTemp: false, conversationId: existingConv.id };
    } else {
      // Nếu chưa có, mở temp chat window
      dispatch(openTempConversation(partnerId));
      return { isTemp: true };
    }
  }
);
