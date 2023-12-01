import { Form, Input } from "antd";

const ReservationStationForm = ({ form }) => {
  return (
    <Form form={form} layout="horizontal">
      <Form.Item
        label="ADD/SUB"
        name="addsubReservationStation"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="MUL/DIV"
        name="muldivReservationStation"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="LOAD BUFFER"
        name="loadReservationStation"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="STORE BUFFER"
        name="storeReservationStation"
        rules={[{ required: true, message: "Please input station size" }]}
      >
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};

export default ReservationStationForm;
