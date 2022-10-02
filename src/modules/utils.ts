import { IServerInfo } from "typings/servers";

export const filterArray = (
  serverName: string | null,
  status: string[],
  cpuUtilization: number[],
  sortBy: string | null,
  order: string | null,
  dataSource: IServerInfo<number>[]
): IServerInfo<number>[] => {
  let sortedData: IServerInfo<number>[] = dataSource;
  sortedData = dataSource.filter((server) => {
    let check = true;
    if (serverName) {
      if (
        !server.serverName
          .toLocaleLowerCase()
          .includes(serverName.toLocaleLowerCase())
      ) {
        check = check && false;
      }
    }
    if (status.length) {
      let result = false;
      for(let st of status){
        if (server.status === st) {
          // check = check && false;
          result = result || true;
          break;
        }
      };
      check = check && result;
    }
    if (cpuUtilization.length) {
      if (
        !(
          server.stats.cpu >= cpuUtilization[0] &&
          server.stats.cpu <= cpuUtilization[1]
        )
      ) {
        check = check && false;
      }
    }
    return check;
  });
  if(sortBy && order) {
    switch (sortBy) {
      case "uptime": {
        sortedData = sortedData.sort((a, b) =>
          order === "descend" ? b.uptime - a.uptime : a.uptime - b.uptime
        );
        break;
      }
      case "created": {
        sortedData = sortedData.sort((a, b) =>
          order === "descend" ? b.created - a.created : a.created - b.created
        );
        break;
      }
      case "status": {
        sortedData = sortedData.sort((a, b) =>
          order === "descend"
            ? ("" + b.status).localeCompare(a.status)
            : ("" + a.status).localeCompare(b.status)
        );
        break;
      }
    }
  }
  return sortedData;
};
