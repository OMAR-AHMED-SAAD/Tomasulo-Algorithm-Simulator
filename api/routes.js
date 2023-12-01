import express from "express";
import { routerCheckup,readInstructionsFile } from "./controller.js";
const router = express.Router();

router.get("/isalive", routerCheckup);
router.get("/read",readInstructionsFile)
export default router;
