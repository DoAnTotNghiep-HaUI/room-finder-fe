import { IRoom, IRoomType } from "@/types/room";
import directus from "@/utils/directus";
import { readItems } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface SearchParams {
  city?: string;
  specific_address: string;
  ward?: string;
  room_type?: string;
  district?: string;
  price?: number;
  limit_people?: number;
  contract_duration?: number;

  amenities?: string[];
  furnitures?: string[];
}

export const searchRentals = createAsyncThunk(
  "search/searchRentals",
  async (params: SearchParams, rejectWithValue) => {
    try {
      // Xây dựng filter query cho Directus
      const filter: any = { _and: [] };

      if (params.city) {
        filter._and.push({ city: { _eq: params.city } });
      }

      if (params.district) {
        filter._and.push({ "district.id": { _eq: params.district } });
      }

      if (params.room_type) {
        filter._and.push({ "room_type.id": { _eq: params.room_type } });
      }

      if (params.price) {
        // const priceFilter: any = {};
        // if (params.priceMin !== undefined) priceFilter._gte = params.priceMin;
        // if (params.priceMax !== undefined) priceFilter._lte = params.priceMax;
        filter._and.push({ price: { _eq: params.price } });
      }

      if (params.amenities && params.amenities.length > 0) {
        filter._and.push({
          amenities: {
            amenities_id: {
              _in: params.amenities,
            },
          },
        });
      }

      if (params.furnitures && params.furnitures.length > 0) {
        filter._and.push({
          furnitures: {
            furnitures_id: {
              _in: params.furnitures,
            },
          },
        });
      }

      // Nếu không có filter nào, xóa _and để lấy tất cả
      if (filter._and.length === 0) {
        delete filter._and;
      }

      // Query Directus
      const response = await directus.request<IRoom>(
        readItems("room", {
          filter,
          fields: [
            "*",
            "city.*",
            "district.*",
            "room_type.*",
            "amenities.*",
            "furnitures.*",
          ],
          limit: 50,
        })
      );

      return response;
    } catch (error: any) {
      console.error("Search error:", error);
    }
  }
);
