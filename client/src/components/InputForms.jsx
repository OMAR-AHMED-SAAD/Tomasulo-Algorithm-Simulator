import { Button, Steps, Form } from "antd";
import { useState } from "react";
import LatencyForm from "./LatencyForm";
import "../css/InputForms.css";
const { Step } = Steps;
const InputForms = () => {
  const [current, setCurrent] = useState(0);
  const [latenciesForm] = Form.useForm();

  const steps = [
    { title: "Latency", content: <LatencyForm form={latenciesForm} /> },
    { title: "Throughput", content: "Second-content" },
  ];

  const onNext = () => {
    if (current != steps.length - 1) {
      latenciesForm.validateFields().then(() => {
        setCurrent(current + 1), console.log(latenciesForm.getFieldsValue());
      });
    } else console.log("finish"); //navigate to next page
  };
  const onBack = () => {
    if (current != 0) setCurrent(current - 1);
  };

  return (
    <div className="input-froms-container">
      <h2>Configure your architecture</h2>
      <Steps current={current} labelPlacement="vertical">
        {steps.map((step, index) => (
          <Step key={index} title={step.title} content={step.content} />
        ))}
      </Steps>
      <div className="input-form">{steps[current].content}</div>
      <br />
      <div className="steps-controls">
        {current != 0 ? (
          <Button type="primary" onClick={onBack}>
            Back
          </Button>
        ) : (
          ""
        )}
        <Button type="primary" onClick={onNext}>
          {current != steps.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
};
export default InputForms;
