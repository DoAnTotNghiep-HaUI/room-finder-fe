import { IConversation } from "@/types/chat";
import { IUser } from "@/types/user";
import directus from "@/utils/directus";
import { createItem, readItem, readItems } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkConversationExists = createAsyncThunk(
  "conversation/checkConversationExists",
  async ({ userId1, userId2 }: { userId1: string; userId2: string }) => {
    try {
      const response: any = await directus.request(
        readItems("conversation", {
          fields: ["*", "participants.*"],
          filter: {
            participants: {
              directus_users_id: {
                _eq: userId1,
              },
            },
          },
        })
      );

      const conversations = response.filter((conv: any) => {
        const participantIds = conv.participants.map(
          (p: any) => p.directus_users_id
        );
        return (
          participantIds.includes(userId1) && participantIds.includes(userId2)
        );
      });

      return conversations;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
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
export const createConvrstion = createAsyncThunk(
  "conversation/createConverstion",
  async (data: IConversation) => {
    try {
      const res = await directus.request(createItem("conversation", data));
      return res;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
