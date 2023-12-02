import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import readline from "readline";
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const __dirname = dirname(currentFilePath);
const instructionsFilePath = path.join(__dirname, "/instructions.txt");

import { checkSpaceInReservationStation, checkSpaceInBuffers } from "./issuing.js";
import {
  parseInstruction,
  fillReservationStationsAndBuffers,
  fillRegisterFile,
} from "./intiation.js";

const registerFile = {};
const addSubReservationStation = {};
const loadBuffer = {};
const storeBuffer = {};
const multDivReservationStation = {};
let instructions = [];
let issuingHead = 0;
let pauseIssuing = false;
const cache = new Array(1024).fill(0);
let isFinished = false; //breaking condition

const sizes = {
  addSize: 3,
  mulSize: 2,
  loadSize: 3,
  storeSize: 3,
};

const readInstructionsFile = async () => {
  try {
    if (fs.existsSync(instructionsFilePath)) {
      const fileStream = fs.createReadStream(instructionsFilePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity, // To recognize all line-ending types ('\n', '\r\n', etc.)
      });
      let index = 0;
      return new Promise((resolve, reject) => {
        rl.on("line", (line) => {
          instructions.push({
            address: index++,
            instruction: parseInstruction(line),
          });
        });
        rl.on("close", () => {
          console.log("File reading completed.");
          resolve();
        });
        rl.on("error", (err) => {
          reject(err);
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const checkStationOrBuffer = (ins) => {
  switch (ins[0]) {
    case "A":
      return checkSpaceInReservationStation(addSubReservationStation, registerFile, ins);
    case "M":
      return checkSpaceInReservationStation(multDivReservationStation, registerFile, ins);
    case "L":
      return checkSpaceInBuffers(loadBuffer, storeBuffer, registerFile, cache, ins);
    case "S":
      return checkSpaceInBuffers(loadBuffer, storeBuffer, registerFile, cache, ins);
  }
};

export const startSimulation = async (sizes) => {
  await readInstructionsFile();
  fillRegisterFile(registerFile);
  fillReservationStationsAndBuffers("A", sizes.addSize, addSubReservationStation);
  fillReservationStationsAndBuffers("M", sizes.mulSize, multDivReservationStation);
  fillReservationStationsAndBuffers("L", sizes.loadSize, loadBuffer);
  fillReservationStationsAndBuffers("S", sizes.storeSize, storeBuffer);
  startCycles();
};

const startCycles = () => {
  const result = {};
  let cycleCount = 1;
  issue();
  while (!isFinished) {
    if (!pauseIssuing) issue();
    // execute();
    // write();
    // finish();
    cycleCount++;
  }
  //issuing: check if there is space in reservation station and buffers and branch is still not resolved and check laod and store conflicts
  //check execution: minus 1 from time if executing or start execution
  //check Writes (define which algo to use)
  //check finish execution //check if the branch instruction is finished
};

const issue = () => {
  const { instruction } = instructions.find((instruction) => instruction.address == issuingHead);
  console.log(instruction);
  if (checkStationOrBuffer(instruction)) {
    if (instruction[1].op == "bnez") pauseIssuing = true;
    issuingHead++;
  }
};

await startSimulation(sizes);
// console.log(multDivReservationStation);
// console.log(addSubReservationStation);
// console.log(loadBuffer);
// console.log(storeBuffer);
// console.log(registerFile);
