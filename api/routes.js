import express from "express";
import {
  routerCheckup,
  setLatencies,
  setReservationStationsSizes,
  getResults
} from "./controller.js";
const router = express.Router();

router.get("/isalive", routerCheckup);
router.post("/readLatencies", setLatencies);
router.post("/readReservationStationsSizes", setReservationStationsSizes);
router.get("/getResults", getResults);
export default router;
