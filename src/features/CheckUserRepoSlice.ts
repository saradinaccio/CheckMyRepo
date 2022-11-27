import React from "react";
import CheckRepoType from "../types/CheckRepoType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import constants from "../constants";

const initialState: CheckRepoType = {
  username: "",
  repository: "",
  loading: true,
  error: false,
  statusCodeUsername: constants.statusCodes.default,
  statusCodeRepo: constants.statusCodes.default,
  isOnline: navigator.onLine,
};

const CheckUserRepoSlice = createSlice({
  name: "checkRepo",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setRepository: (state, action: PayloadAction<string>) => {
      state.repository = action.payload;
    },
    setStatusCodeUsername: (state, action: PayloadAction<number>) => {
      state.statusCodeUsername = action.payload;
    },
    setStatusCodeRepo: (state, action: PayloadAction<number>) => {
      state.statusCodeRepo = action.payload;
    },
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setUsername,
  setRepository,
  setStatusCodeUsername,
  setStatusCodeRepo,
  setIsOnline,
} = CheckUserRepoSlice.actions;
export default CheckUserRepoSlice.reducer;
