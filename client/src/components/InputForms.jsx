import { Button, Steps, Form, message } from "antd";
import { useState } from "react";
import LatencyForm from "./LatencyForm";
import ReservationStationForm from "./ReservationStationsForm";
import "../css/InputForms.css";
import { baseApiUrl } from "../api";
import axios from "axios";
const { Step } = Steps;
const InputForms = () => {
  const [current, setCurrent] = useState(0);
  const [latenciesForm] = Form.useForm();
  const [reservationStationsForm] = Form.useForm();

  const steps = [
    { title: "Latencies", content: <LatencyForm form={latenciesForm} /> },
    {
      title: "Reservation Stations",
      content: <ReservationStationForm form={reservationStationsForm} />,
    },
  ];

  const submitLatencies = () => {
    console.log(latenciesForm.getFieldsValue());
    axios
      .post(`${baseApiUrl}/readLatencies`, latenciesForm.getFieldsValue())
      .then(() => {
        setCurrent(current + 1);
        latenciesForm.resetFields();
      })
      .catch((err) => {
        console.log(err);
        message.error("Error in input");
      });
  };

  const submitReservationStations = () => {
    axios
      .post(
        `${baseApiUrl}/readReservationStationsSizes`,
        reservationStationsForm.getFieldsValue()
      )
      .then(() => {
        reservationStationsForm.resetFields();
      })
      .catch((err) => {
        console.log(err);
        message.error("Error in input");
      });
  };

  const onNext = () => {
    if (current != steps.length - 1) {
      latenciesForm.validateFields().then(() => {
        submitLatencies();
      });
    } else
      reservationStationsForm.validateFields().then(() => {
        submitReservationStations();
      });
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
          {current != steps.length - 1 ? "Next" : "Start Simulation"}
        </Button>
      </div>
    </div>
  );
};
export default InputForms;
