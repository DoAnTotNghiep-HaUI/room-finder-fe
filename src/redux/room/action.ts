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
          "photos.directus_files_id.*",
        ],
      })
    );
    return response;
  } catch (error) {
    //   return rejectWithValue(error);
    console.log("error", error);
  }
});
