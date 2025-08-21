import directus from "@/utils/directus";
import { readItem, readItems } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListRoom = createAsyncThunk("room/getListRoom", async () => {
  try {
    const response: any = await directus.request(
      readItems("room", {
        fields: [
          "*",
          "room_type.*",
          "building.*",
          "building.landlord.*",
          "photos.*",
        ],
      })
    );
    console.log("room list data", response);

    return response;
  } catch (error) {
    //   return rejectWithValue(error);
    console.log("error", error);
  }
});
export const getRoomNewPost = createAsyncThunk(
  "room/getRoomNewPost",
  async (roomType: string) => {
    try {
      const response: any = await directus.request(
        readItems("room", {
          fields: [
            "*",
            "room_type.*",
            "building.*",
            "building.landlord.*",
            "photos.*",
          ],
          filter: {
            room_type: {
              _eq: roomType,
            },
          },
          sort: ["-date_created"],
          limit: 9,
        })
      );
      console.log("room list data", response);

      return response;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
export const getRoomCheapPrice = createAsyncThunk(
  "room/getRoomCheapPrice",
  async () => {
    try {
      const response: any = await directus.request(
        readItems("room", {
          fields: [
            "*",
            "room_type.*",
            "building.*",
            "building.landlord.*",
            "photos.*",
          ],
          filter: {
            room_price: {
              _lte: 3000000,
            },
          },
          sort: ["-date_created"],
          limit: 9,
        })
      );

      return response;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
