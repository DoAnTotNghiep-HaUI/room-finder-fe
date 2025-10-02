import { createAsyncThunk } from "@reduxjs/toolkit";
import directus from "@/utils/directus";
import { createItem, deleteItem, readItems } from "@directus/sdk";
import { IMaintenance } from "@/types/maintenance";

export const addMaintenance = createAsyncThunk(
  "maintenance/add",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await directus.request(createItem("recent_activities", data));
      return res;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Thêm yêu cầu thất bại");
    }
  }
);

export const deleteMaintenance = createAsyncThunk(
  "maintenance/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await directus.request(deleteItem("recent_activities", id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Xoá yêu cầu thất bại");
    }
  }
);

export const getMaintenanceByUser = createAsyncThunk(
  "maintenance/getByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await directus.request(
        readItems("recent_activities", {
          filter: { user_created: { _eq: userId } },
          sort: ["-date_created"],
        })
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Không lấy được danh sách");
    }
  }
);
