import { createAsyncThunk } from "@reduxjs/toolkit";
import { createItem, deleteItem } from "@directus/sdk";
import directus from "@/utils/directus";

interface BookingPayload {
  room_id: string;
  landlord_id: string;
  tenant_id: string;
  scheduled_date: string;
  status: string;
  reject_reson?: string;
}

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload: BookingPayload, { rejectWithValue }) => {
    try {
      const response = await directus.request(createItem("booking", payload));
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Đặt lịch thất bại");
    }
  }
);
import { readItems } from "@directus/sdk";

export const getBookingsByUser = createAsyncThunk(
  "booking/getBookingsByUser",
  async (tenant_id: string, { rejectWithValue }) => {
    try {
      const response = await directus.request(
        readItems("booking", {
          filter: { tenant_id: { _eq: tenant_id } },
          fields: [
            "*",
            "room_id.*",
            "landlord_id.*",
            "room_id.building.*",
            "room_id.building.district.*",
          ],
          sort: ["-scheduled_date"],
        })
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Không lấy được danh sách lịch");
    }
  }
);
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      await directus.request(deleteItem("booking", bookingId));
      return bookingId;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Xoá lịch thất bại");
    }
  }
);
