import { createSlice } from "@reduxjs/toolkit";
import { getBookingsByUser } from "./action";

interface BookingState {
  bookings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookingsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookingsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
