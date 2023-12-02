import { startSimulation } from "./Tomasulo/Tomasulo.js";

export const routerCheckup = (req, res) => {
  res.send("Router and Controller Working!");
};

export const setLatencies = (req, res) => {
  console.log(req.body);
};

export const setReservationStationsSizes = (req, res) => {
  console.log(req.body);
};
