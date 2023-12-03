import { startSimulation, setLatency, setSizes } from "./Tomasulo/Tomasulo.js";

export const routerCheckup = (req, res) => {
  res.send("Router and Controller Working!");
};

export const setLatencies = (req, res) => {
  setLatency({ ...req.body, addi: "1", bnez: "1" });
  console.log(req.body);
  res.status(200).send("Latencies Received!");
};

let result = [];

export const setReservationStationsSizes = async (req, res) => {
  setSizes(req.body);
  console.log(req.body);
  const results = await startSimulation();
  result=results;
  res
    .status(200)
    .send({ message: "Reservation Stations Sizes Received!", results });
};

export const getResults = (req, res) => {
  res.status(200).send(result);
}

