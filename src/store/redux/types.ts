import { IServerInfo } from "typings/servers";

export interface IServersState {
  list: IServerInfo<string>[];
  totalCount: number;
  loading: boolean;
}
