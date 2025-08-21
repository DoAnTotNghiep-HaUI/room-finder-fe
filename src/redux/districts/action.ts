import { IFurniture } from "@/types/room";
import directus from "@/utils/directus";
import { readItems } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListDistrict = createAsyncThunk(
  "districts/getListDistrict",
  async () => {
    try {
      const response = await directus.request<any>(
        readItems("districts", {
          fields: ["*", "photo.*"],
        })
      );
      return response;
    } catch (error) {
      //   return rejectWithValue(error);
      console.log("error", error);
    }
  }
);
