import express from "express";
import { routerCheckup, readInstructionsFile } from "./controller.js";
const router = express.Router();

router.get("/isalive", routerCheckup);
router.get("/read", readInstructionsFile);
router.post("/readLatencies", (req, res) => {
  console.log(req.body);
  res.send("readLatencies");
});
router.post("/readReservationStationsSizes", (req, res) => {
    console.log(req.body);
  res.send("readReservationStationsSizes");
}
);
export default router;
