import { Form, Input } from "antd";
  // addSize: 3,
  // mulSize: 2,
  // loadSize: 3,
  // storeSize: 3,
const ReservationStationForm = ({ form }) => {
  return (
    <Form form={form} layout="horizontal">
      <Form.Item
        label="ADD/SUB"
        name="addSize"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="MUL/DIV"
        name="mulSize"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="LOAD BUFFER"
        name="loadSize"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="STORE BUFFER"
        name="storeSize"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};

export default ReservationStationForm;
