import { AuthParams } from "@/types/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { get } from "react-hook-form";
import { getUser } from "./action";
import { set } from "date-fns";

// const initialState: AuthParams = {
//   isLoading: false,
//   errorMessage: "",
//   userInfo: JSON.parse(localStorage.getItem("user_info") || "null"),
//   access_token: localStorage.getItem("access_token"),
//   refresh_token: localStorage.getItem("refresh_token"),
//   expires: localStorage.getItem("expires")
//     ? Number(localStorage.getItem("expires"))
//     : null,
//   expires_at: localStorage.getItem("expires_at")
//     ? new Date(localStorage.getItem("expires_at")!)
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUserInfo(state, action: PayloadAction<Partial<AuthParams>>) {
//       return { ...state, ...action.payload };
//     },
//     setToken(state, action: PayloadAction<string | null>) {
//       if (action.payload) {
//         localStorage.setItem("access_token", action.payload);
//         state.access_token = action.payload;
//       } else {
//         localStorage.removeItem("access_token");
//         state.access_token = null;
//       }
//     },
//     setRefreshToken(state, action: PayloadAction<string | null>) {
//       if (action.payload) {
//         localStorage.setItem("refresh_token", action.payload);
//         state.refresh_token = action.payload;
//       } else {
//         localStorage.removeItem("refresh_token");
//         state.refresh_token = null;
//       }
//     },
//     setExpires(state, action: PayloadAction<number | null>) {
//       if (action.payload) {
//         localStorage.setItem("expires", action.payload.toString());
//         state.expires = action.payload;
//       } else {
//         localStorage.removeItem("expires");
//         state.expires = null;
//       }
//     },
//     setExpiresAt(state, action: PayloadAction<Date | null>) {
//       if (action.payload) {
//         localStorage.setItem("expires_at", action.payload.toString());
//         state.expires_at = action.payload;
//       } else {
//         localStorage.removeItem("expires_at");
//         state.expires_at = null;
//       }
//     },
//     logout(state) {
//       state.access_token = null;
//       state.refresh_token = null;
//       state.expires = null;
//       state.expires_at = null;
//       state.userInfo = null;
//       localStorage.clear();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getUser.fulfilled, (state, action) => {
//         state.userInfo = action.payload;
//         localStorage.setItem("user_info", JSON.stringify(action.payload));
//         state.isLoading = false;
//       })
//       .addCase(getUser.rejected, (state) => {
//         state.isLoading = false;
//       });
//   },
// });
// export const {
//   setUserInfo,
//   setToken,
//   setRefreshToken,
//   setExpires,
//   setExpiresAt,
//   logout,
// } = authSlice.actions;

// export default authSlice.reducer;
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expires: number | null;
  expiresAt: Date | null;
  userInfo: any;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  expires: localStorage.getItem("expires")
    ? Number(localStorage.getItem("expires"))
    : null,
  expiresAt: localStorage.getItem("expires_at")
    ? new Date(localStorage.getItem("expires_at")!)
    : null,
  userInfo: localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<AuthState>) {
      Object.assign(state, action.payload);

      localStorage.setItem("access_token", action.payload.accessToken!);
      localStorage.setItem("refresh_token", action.payload.refreshToken!);
      localStorage.setItem("expires", String(action.payload.expires!));
      localStorage.setItem(
        "expires_at",
        action.payload.expiresAt!.toISOString()
      );
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
      localStorage.setItem("user_info", JSON.stringify(action.payload));
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.expires = null;
      state.expiresAt = null;
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setAuthData, setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
