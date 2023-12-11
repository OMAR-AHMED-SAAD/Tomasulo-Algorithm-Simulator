import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname, resolve } from "path";
import readline from "readline";
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const __dirname = dirname(currentFilePath);
const instructionsFilePath = path.join(__dirname, "/instructions.txt");

import {
  parseInstruction,
  fillReservationStationsAndBuffers,
  fillRegisterFile,
  fillLoadBuffer,
  fillStoreBuffer,
} from "./intiation.js";

import {
  checkSpaceInReservationStation,
  checkSpaceInBuffers,
  issuingTableInstruction,
} from "./issuing.js";

import {
  executeAddSub,
  executeMultDiv,
  executeLoad,
  executeStore,
} from "./execution.js";

import { writeInstruction } from "./write.js";
let registerFile = {};
let addSubReservationStation = {};
let loadBuffer = {};
let storeBuffer = {};
let multDivReservationStation = {};
let instructions = [];
let issuingHead = 0;
let pauseIssuing = false;
let cache = new Array(16).fill(0);
let cycleCount = 1;
let issuingTable = [];
let latencies = {
  // sub: "2",
  // add: "1",
  // mul: "4",
  // div: "5",
  // load: "3",
  // store: "2",
  // subi: "1",
  // addi: "1",
  // bnez: "1",
};

let sizes = {
  // addSize: 3,
  // mulSize: 2,
  // loadSize: 3,
  // storeSize: 3,
};

export const setLatency = (latency) => {
  latencies = { ...latency, addi: "1", bnez: "1" };
};
export const setSizes = (size) => {
  sizes = size;
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
          let ins = {
            address: index,
            instruction: parseInstruction(line),
            unParsedInstruction: line,
          };
          if (line.includes(":")) {
            let loopAddress = line.split(":")[0];
            ins = {
              address: index,
              loopAddress,
              instruction: parseInstruction(line.split(":")[1].trim()),
              unParsedInstruction: line.split(":")[1].trim(),
            };
          }
          instructions.push(ins);
          index++;
        });
        rl.on("close", () => {
          // console.log("File reading completed.");
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
      return checkSpaceInReservationStation(
        addSubReservationStation,
        registerFile,
        ins
      );
    case "M":
      return checkSpaceInReservationStation(
        multDivReservationStation,
        registerFile,
        ins
      );
    case "L":
      return checkSpaceInBuffers(
        loadBuffer,
        storeBuffer,
        registerFile,
        cache,
        ins
      );
    case "S":
      return checkSpaceInBuffers(
        loadBuffer,
        storeBuffer,
        registerFile,
        cache,
        ins
      );
  }
};

export const startSimulation = async () => {
  registerFile = {};
  addSubReservationStation = {};
  loadBuffer = {};
  storeBuffer = {};
  multDivReservationStation = {};
  instructions = [];
  issuingHead = 0;
  pauseIssuing = false;
  cache = [1, 3, 2, 2, 1, 3, 2, 1, 3, 3, 2, 1, 2, 1, 3, 3];
  issuingTable = [];
  cycleCount = 1;
  await readInstructionsFile();
  //console.log("INSTRUCTIONS"); console.table(instructions);
  fillRegisterFile(registerFile);
  fillReservationStationsAndBuffers(
    "A",
    sizes.addSize,
    addSubReservationStation
  );
  fillReservationStationsAndBuffers(
    "M",
    sizes.mulSize,
    multDivReservationStation
  );
  fillLoadBuffer(loadBuffer, sizes.loadSize);
  fillStoreBuffer(storeBuffer, sizes.storeSize);
  return startCycles();
};

const startCycles = () => {
  let result = [];
  while (cycleCount == 1 || !isFinished() || issuingHead < instructions.length) {
    if (!pauseIssuing) issue();
    execute();
    write();
    finish();
    let cycleObj = {
      cycle: cycleCount,
      issuingTable:JSON.parse(JSON.stringify(issuingTable)),
      addSubReservationStation:JSON.parse(JSON.stringify(addSubReservationStation)),
      multDivReservationStation:JSON.parse(JSON.stringify(multDivReservationStation)),
      loadBuffer:JSON.parse(JSON.stringify(loadBuffer)),
      storeBuffer:JSON.parse(JSON.stringify(storeBuffer)),
      registerFile:JSON.parse(JSON.stringify(registerFile)),
      cache:JSON.parse(JSON.stringify(cache)),
    };
    result.push(cycleObj);
    printCycle();
    cycleCount++;
  }
  return result;
};

const isFinished = () => {
  let finished = true;
  Object.values(addSubReservationStation).forEach((station) => {
    if (station.busy == 1) finished = false;
  });
  Object.values(multDivReservationStation).forEach((station) => {
    if (station.busy == 1) finished = false;
  });
  Object.values(loadBuffer).forEach((station) => {
    if (station.busy == 1) finished = false;
  });
  Object.values(storeBuffer).forEach((station) => {
    if (station.busy == 1) finished = false;
  });
  return finished;
};

const printCycle = () => {
  console.log("cycle", cycleCount);
  console.log("ISSUIING TABLE");
  console.table(issuingTable);
  console.log("MUL/DIV");
  console.table(multDivReservationStation);
  console.log("ADD/SUB");
  console.table(addSubReservationStation);
  console.log("LOAD");
  console.table(loadBuffer);
  console.log("STORE");
  console.table(storeBuffer);
  console.log("REG FILE");
  console.table(registerFile);
  console.log("CACHE");
  console.table(cache);
};

const issue = () => {
  if (issuingHead >= instructions.length) return;
  let { instruction, unParsedInstruction } = instructions.find(
    (instruction) => instruction.address == issuingHead
  );
  instruction=JSON.parse(JSON.stringify(instruction));
  if (checkStationOrBuffer(instruction)) {
    //pause issuing if branch and resume when branch is resolved
    //and write address of the instruction with loop address to the issuing Head in the finish execution
    issuingTable.push(
      issuingTableInstruction(unParsedInstruction, cycleCount)
    );
    instruction[1].issueCycle = cycleCount;
    if (instruction[1].op == "bnez") pauseIssuing = true;
    issuingHead++;
  }
};

const execute = () => {
  executeAddSub(addSubReservationStation, latencies, issuingTable, cycleCount);
  executeMultDiv(
    multDivReservationStation,
    latencies,
    issuingTable,
    cycleCount
  );
  executeLoad(loadBuffer, latencies, issuingTable, cycleCount);
  executeStore(storeBuffer, latencies, issuingTable, cycleCount);
};

const write = () => {
  writeInstruction(
    registerFile,
    addSubReservationStation,
    multDivReservationStation,
    loadBuffer,
    storeBuffer,
    cache,
    issuingTable,
    cycleCount
  );
};

const finish = () => {
  Object.values(addSubReservationStation).forEach((station) => {
    let instruction = issuingTable.find(
      (instruction) => instruction.issue == station.issueCycle
    );
    let latency = latencies[station.op];
    if (
      station.busy == 1 &&
      station.Time == 1 &&
      latency == cycleCount - instruction.startExecution + 1
    ) {
      instruction.endExecution = cycleCount;
      station.Time = 0;
      if (station.op == "bnez") {
        pauseIssuing = false;
        resolveBranch(station);
        station.busy = 0;
      }
    }
  });
  Object.values(multDivReservationStation).forEach((station) => {
    let instruction = issuingTable.find(
      (instruction) => instruction.issue == station.issueCycle
    );
    let latency = latencies[station.op];
    if (
      station.busy == 1 &&
      station.Time == 1 &&
      latency == cycleCount - instruction.startExecution + 1
    ) {
      instruction.endExecution = cycleCount;
      station.Time = 0;
    }
  });
  Object.values(loadBuffer).forEach((station) => {
    let instruction = issuingTable.find(
      (instruction) => instruction.issue == station.issueCycle
    );
    let latency = latencies[station.op];
    if (
      station.busy == 1 &&
      station.Time == 1 &&
      latency == cycleCount - instruction.startExecution + 1
    ) {
      instruction.endExecution = cycleCount;
      station.Time = 0;
    }
  });
  Object.values(storeBuffer).forEach((station) => {
    let instruction = issuingTable.find(
      (instruction) => instruction.issue == station.issueCycle
    );
    let latency = latencies[station.op];
    if (
      station.busy == 1 &&
      station.Time == 1 &&
      latency == cycleCount - instruction.startExecution + 1
    ) {
      instruction.endExecution = cycleCount;
      station.Time = 0;
      cache[station.A] = station.Vj;
    }
  });
};

const resolveBranch = (instruction) => {
  const { Vj, A } = instruction;
  if (Vj != 0) {
    const loopInstruction = instructions.find(
      (instruction) => instruction.loopAddress == A
    );
    issuingHead = loopInstruction.address;
  }
};
