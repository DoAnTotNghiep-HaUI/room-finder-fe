import directus from "@/utils/directus";
import { readMe, refresh } from "@directus/sdk";
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
