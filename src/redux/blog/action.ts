import { IBlog } from "@/types/blog";
import { IFurniture } from "@/types/room";
import directus from "@/utils/directus";
import { readItems } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListBlog = createAsyncThunk("blog/getListBlog", async () => {
  try {
    const response = await directus.request<IBlog[]>(
      readItems("blog", {
        fields: ["*", "image.*", "user_created.*", "user_created.role.name"],
        sort: ["-date_created"],
      })
    );
    return response;
  } catch (error) {
    //   return rejectWithValue(error);
    console.log("error", error);
  }
});
