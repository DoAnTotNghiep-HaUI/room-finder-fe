import { IConversation } from "@/types/chat";
import { IUser } from "@/types/user";
import directus from "@/utils/directus";
import { createItem, readItem, readItems } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getConversationById = createAsyncThunk(
  "conversation/getConversationById",
  async (conversationId: string) => {
    try {
      const res = await directus.request(
        readItem("conversation", conversationId, {
          fields: [
            "*",
            "last_message.*",
            "participants.*",
            "participants.directus_users_id.*",
            "participants.directus_users_id.avatar.*",
          ],
        })
      );
      return res as IConversation;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
