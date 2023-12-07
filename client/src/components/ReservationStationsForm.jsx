import { Form, Input, Button, Col } from "antd";
const ReservationStationForm = ({ form }) => {
  const handleAutoFill = () => {
    form.setFieldsValue({
      addSize: 3,
      mulSize: 2,
      loadSize: 3,
      storeSize: 3,
    });
  };
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
      <Form.Item style={{ marginBottom: 0 }}>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={handleAutoFill}>
            Autofill
          </Button>
        </Col>
      </Form.Item>
    </Form>
  );
};

export default ReservationStationForm;
