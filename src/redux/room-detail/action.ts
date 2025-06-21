import directus from "@/utils/directus";
import { readItem } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRoomDetail = createAsyncThunk(
  "room/getRoomDetail",
  async (id: string) => {
    try {
      const response: any = await directus.request(
        readItem("room", id, {
          fields: [
            "*",
            "room_type.*",
            "building.building_image.*",
            "building.landlord.*",
            "building.landlord.avatar.*",
            "building.landlord.landlord_verification.*",
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
  }
);
