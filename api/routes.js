import express from "express";
import {
  routerCheckup,
  readInstructionsFile,
  setLatencies,
  setReservationStationsSizes,
} from "./controller.js";
const router = express.Router();

router.get("/isalive", routerCheckup);
router.post("/readLatencies", setLatencies);
router.post("/readReservationStationsSizes", setReservationStationsSizes);
export default router;
