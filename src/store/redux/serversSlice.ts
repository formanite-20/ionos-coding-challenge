import { createSlice } from "@reduxjs/toolkit";

import { ServersAsyncActions } from "./serversAsync";
import { IServersState } from "./types";

const initialState: IServersState = {
  list: [],
  totalCount: 0,
  loading: false,
};

export const serversSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ServersAsyncActions.List.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ServersAsyncActions.List.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(ServersAsyncActions.List.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.totalCount = action.payload.totalCount;
    });
  },
});
export const serversActions = serversSlice.actions;
export default serversSlice.reducer;
