import { Form, Input,Button,Col } from "antd";
const LatencyForm = ({ form }) => {
  const handleAutoFill = () => {
    form.setFieldsValue({
      sub: 1,
      add: 1,
      mul: 1,
      div: 1,
      load: 1,
      store: 1,
      subi: 1,
    });
  };
  return (
    <Form form={form} layout="horizontal">
      <Form.Item
        label="SUB Latency"
        name="sub"
        rules={[{ required: true, message: "Please input sub latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="ADD Latency"
        name="add"
        rules={[{ required: true, message: "Please input add latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="MUL Latency"
        name="mul"
        rules={[{ required: true, message: "Please input multiply latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="DIV Latency"
        name="div"
        rules={[{ required: true, message: "Please input divide latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="LOAD Latency"
        name="load"
        rules={[{ required: true, message: "Please input load latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="STORE Latency"
        name="store"
        rules={[{ required: true, message: "Please input store latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="SUB IMM Latency"
        name="subi"
        rules={[{ required: true, message: "Please input add latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item style={{marginBottom:0}}>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={handleAutoFill} >
            Autofill
          </Button>
        </Col>
      </Form.Item>
    </Form>
  );
};

export default LatencyForm;
