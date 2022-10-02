import axios, { AxiosResponse } from "axios";

import { IServersResponse } from "typings/servers";

const serversListUrl = ".netlify/functions/servers";

export const ServersList = (): Promise<AxiosResponse<IServersResponse>> =>
  axios.get(`${serversListUrl}`);