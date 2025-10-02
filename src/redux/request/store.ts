import { createSlice } from "@reduxjs/toolkit";
import { getMaintenanceByUser } from "./action";

interface MaintenanceState {
  requestList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MaintenanceState = {
  requestList: [],
  loading: false,
  error: null,
};

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMaintenanceByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaintenanceByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.requestList = action.payload;
      })
      .addCase(getMaintenanceByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default maintenanceSlice.reducer;
