import directus from "@/utils/directus";
import { readItems, readMe, refresh, updateUser } from "@directus/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout, setAuthData, setUserInfo } from "./store";
// import {
//   logout,
//   setExpires,
//   setExpiresAt,
//   setRefreshToken,
//   setToken,
//   setUserInfo,
// } from "./store";
export const checkExitsUser = createAsyncThunk(
  "auth/checkExitsUser",
  async (email: string) => {
    try {
      const response: any = await directus.request(
        readItems("users", {
          filter: { email: { _eq: email } },
          fields: ["id", "email"],
          limit: 1,
        })
      );
      return response.length > 0;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
);
export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const response: any = await directus.request(
      readMe({
        fields: ["*, avatar.*"],
      })
    );
    return response;
  } catch (error) {
    //   return rejectWithValue(error);
    console.log("error", error);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    const res = await directus.login(email, password);
    const { access_token, refresh_token, expires, expires_at } = res;

    dispatch(
      setAuthData({
        accessToken: access_token,
        refreshToken: refresh_token,
        expires,
        expiresAt: new Date(expires_at),
        userInfo: null,
      })
    );

    const user = await directus.request(readMe({ fields: ["*, avatar.*"] }));
    dispatch(setUserInfo(user));
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { dispatch, getState }) => {
    const state: any = getState();
    const refresh_token = state.auth.refreshToken;

    if (!refresh_token) {
      dispatch(logout());
      return;
    }

    const res = await directus.request(refresh("json", refresh_token));
    const {
      access_token,
      refresh_token: new_refresh,
      expires,
      expires_at,
    } = res;

    dispatch(
      setAuthData({
        accessToken: access_token,
        refreshToken: new_refresh,
        expires,
        expiresAt: new Date(expires_at),
        userInfo: state.auth.userInfo,
      })
    );
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUser",
  async (data: { id: string; update: any }, { dispatch, rejectWithValue }) => {
    try {
      await directus.request(updateUser(data.id, data.update));
      const user = await directus.request(readMe({ fields: ["*, avatar.*"] }));
      dispatch(setUserInfo(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Cập nhật thông tin thất bại");
    }
  }
);
