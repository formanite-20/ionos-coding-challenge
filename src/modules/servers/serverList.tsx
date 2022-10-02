import { useEffect } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSearchParams } from "react-router-dom";

import { FilterBoxComponent, CountryComponent } from "components";
import { ServersAsyncActions } from "store/redux/serversAsync";
import { useAppDispatch, useAppSelector } from "store/redux/reduxHooks";
import { IServerInfo } from "typings/servers";
import { MainPageContainerStyled } from "./styled";
import { filterArray } from "../utils";

export const ServerList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ServersAsyncActions.List());
  }, [dispatch]);

  const {
    list,
    loading,
  } = useAppSelector((state) => state.servers);
  let [searchParams,] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");
  const serverName = searchParams.get("serverName");
  const status = searchParams.getAll("status");
  const cpuUtilizationStr = searchParams.getAll("cpuUtilization");
  const cpuUtilization = [
    cpuUtilizationStr[0] ? Number(cpuUtilizationStr[0]) : 0,
    cpuUtilizationStr[1] ? Number(cpuUtilizationStr[1]) : 100,
  ];
  const initialDatasource: IServerInfo<number>[] = [];
  if (list)
    list.forEach((server: IServerInfo<string>) => {
      const createdDate = new Date(server.created);
      initialDatasource.push({
        ...server,
        key: server.id,
        created: createdDate.getTime() / 1000,
      });
    });
  let sortedAndFilteredDatasource: IServerInfo<number>[] = initialDatasource;
  sortedAndFilteredDatasource = filterArray(
    serverName,
    status,
    cpuUtilization,
    sortBy,
    order,
    sortedAndFilteredDatasource
  );
  const columns: ColumnsType<IServerInfo<number>> = [
    {
      title: "Server Name",
      dataIndex: "serverName",
      key: "serverName",
      render: (text) => <span onClick={(e) => e.preventDefault}>{text}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => {
        return <CountryComponent name={text} />;
      },
    },
    {
      title: "IPv4",
      dataIndex: "ipv4",
      key: "ipv4",
    },
    {
      title: "Uptime (Days)",
      dataIndex: "uptime",
      key: "uptime",
      render: (seconds) => Math.round(seconds / 86400),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status, key }) => {
        const color =
          status === "online"
            ? "green"
            : status === "idle"
            ? "orange"
            : status === "offline"
            ? "volcano"
            : "gray";
        return (
          <Tag color={color} key={key}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Stats",
      children: [
        {
          title: "CPU",
          dataIndex: "cpu",
          key: "cpu",
          render: (_, item) => item.stats.cpu,
        },
        {
          title: "RAM",
          dataIndex: "ram",
          key: "ram",
          render: (_, item) => item.stats.ram,
        },
        {
          title: "Disk",
          dataIndex: "disk",
          key: "disk",
          render: (_, item) => item.stats.disk,
        },
      ],
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (_, { created }) => {
        const date = new Date(created * 1000);
        return `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`;
      },
    },
  ];

  return (
    <MainPageContainerStyled>
      <FilterBoxComponent initialValues={{ serverName, status, cpuUtilization, sortBy, order }} />
      <Table
        columns={columns}
        dataSource={sortedAndFilteredDatasource}
        loading={loading}
      />
    </MainPageContainerStyled>
  );
};
