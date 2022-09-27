export type StatusType = "online" | "offline" | "idle";

export interface IStats {
  cpu: number;
  ram: number;
  disk: number;
}

export interface IServerInfo<CreatedType> {
  id: number;
  serverId: string;
  serverName: string;
  location: string;
  ipv4: string;
  uptime: number;
  status: StatusType;
  created: CreatedType;
  key: number;
  stats: IStats;
}

export interface IServersRespose {
  data: IServerInfo<string>[];
  totalCount: number;
}
