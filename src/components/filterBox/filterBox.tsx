import { Col, Form, Row, Select, Input, Slider, Button } from "antd";
import { useSearchParams } from "react-router-dom";

import { FilterBoxContainer, FilterBoxHeader } from "./styled";
import { IFilterFormValues, FilterBoxProps } from "./types";

export const FilterBoxComponent = (props: FilterBoxProps) => {
  const { Option } = Select;
  const { initialValues } = props;
  let [, setSearchParams] = useSearchParams();
  const onFinish = (values: IFilterFormValues) => {
    const newParams: any = values;
    Object.entries(values).forEach((entry) => {
      if (!entry[1]) {
        delete newParams[entry[0]];
      }
    });
    setSearchParams(newParams);
  };

  return (
    <FilterBoxContainer>
      <FilterBoxHeader>Filter</FilterBoxHeader>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name={"serverName"} label={"Server Name"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name={"status"} label={"Status"}>
              <Select mode="multiple" allowClear>
                <Option value={"online"}>online</Option>
                <Option value={"offline"}>offline</Option>
                <Option value={"idle"}>idle</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name={"cpuUtilization"}
              label={"CPU Utilization (percent)"}
            >
              <Slider range defaultValue={[0, 100]} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name={"sortBy"} label={"Sort By"}>
              <Select allowClear>
                <Option value={"uptime"}>Uptime</Option>
                <Option value={"created"}>Created</Option>
                <Option value={"status"}>Status</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item name={"order"} label={"order"}>
              <Select>
                <Option value={"ascend"}>ascend</Option>
                <Option value={"descend"}>descend</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </FilterBoxContainer>
  );
};
