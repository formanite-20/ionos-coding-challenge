import { createAsyncThunk } from "@reduxjs/toolkit";

import { ServersList } from "services/servers";
import { IServersResponse } from "typings/servers";
import { ThunkAPIConfig } from "typings/general";

const List = createAsyncThunk<IServersResponse, void, ThunkAPIConfig>(
  "servers/list",
  async (_, { rejectWithValue }) => {
    try {
      const serversResult = await ServersList();
      return serversResult.data;
    } catch (error) {
      return rejectWithValue({ message: "Error While trying to fetch ServersList!" });
    }
  }
);
export const ServersAsyncActions = { List };
