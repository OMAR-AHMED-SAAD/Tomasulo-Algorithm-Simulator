import { Form, Input } from "antd";

const LatencyForm = ({ form }) => {
  return (
    <Form form={form} layout="inline" className="latency-form">
      <Form.Item
        label="FP SUB Latency"
        name="subLatency"
        rules={[{ required: true, message: "Please input sub latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="FP ADD Latency"
        name="addLatency"
        rules={[{ required: true, message: "Please input add latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="FP MUL Latency"
        name="multiplyLatency"
        rules={[{ required: true, message: "Please input multiply latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="FP DIV Latency"
        name="divideLatency"
        rules={[{ required: true, message: "Please input divide latency!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="INT ADD Latency"
        name="intAddLatency"
        rules={[{ required: true, message: "Please input add latency!" }]}
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
    </Form>
  );
};

export default LatencyForm;
