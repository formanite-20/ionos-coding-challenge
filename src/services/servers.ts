import axios, { AxiosResponse } from "axios";

import { IServersRespose } from "typings/servers";

const serversListUrl = ".netlify/functions/servers";

export const ServersList = (): Promise<AxiosResponse<IServersRespose>> =>
  axios.get(`${serversListUrl}`);
