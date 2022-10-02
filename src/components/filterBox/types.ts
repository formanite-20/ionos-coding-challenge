
export interface IFilterFormValues {
  serverName?: string | null;
  status?: string[];
  cpuUtilization?: number[];
  sortBy?: string | null;
  order?: string | null;
}

export interface FilterBoxProps {
  initialValues: IFilterFormValues;
}
