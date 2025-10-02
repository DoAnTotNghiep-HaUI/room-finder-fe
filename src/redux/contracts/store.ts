import { createSlice } from "@reduxjs/toolkit";
import {
  getListContractsByTenant,
  createContract,
  updateContract,
} from "./action";
import { IRentalContract } from "@/types/contract";

interface ContractsState {
  contractsList: IRentalContract[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContractsState = {
  contractsList: [],
  isLoading: false,
  error: null,
};

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get list
      .addCase(getListContractsByTenant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListContractsByTenant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contractsList = action.payload;
      })
      .addCase(getListContractsByTenant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Lỗi lấy danh sách hợp đồng";
      });
  },
});

export default contractsSlice.reducer;
