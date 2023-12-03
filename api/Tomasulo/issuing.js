export const checkSpaceInReservationStation = (
  reservationStation,
  registerFile,
  ins
) => {
  issuingTableInstruction(ins);
  let foundSpace = false;
  let [type, instruction, reg1, reg2, reg3] = ins;
  Object.entries(reservationStation).map(([key, value]) => {
    if (foundSpace) return undefined;
    if (value["busy"] == 0) {
      fillInstruction(reg2, "j", registerFile, instruction);
      if (instruction.op !== "bnez")
        fillInstruction(reg3, "k", registerFile, instruction);
      reservationStation[key] = instruction;
      foundSpace = true;
      if (reg1) registerFile[reg1]["Qi"] = key;
    }
    return undefined;
  });
  return foundSpace;
};
const fillInstruction = (reg, place, registerFile, instruction) => {
  if (registerFile[reg]["Qi"] !== 0) {
    instruction[`Q${place}`] = registerFile[reg]["Qi"];
  } else {
    instruction[`V${place}`] = registerFile[reg]["value"];
  }
};
export const checkSpaceInBuffers = (
  loadBuffer,
  storeBuffer,
  registerFile,
  cache,
  ins
) => {
  let [type, instruction, reg1, reg2, reg3] = ins;
  let foundSpace = false;
  let noConflict = true;
  const storeBufferContent = Object.entries(storeBuffer);
  const loadBufferContent = Object.entries(loadBuffer);
  if (instruction.op == "store")
    noConflict =
      checkConflict(storeBufferContent, reg3) &&
      checkConflict(loadBufferContent, reg3);
  else noConflict = checkConflict(storeBufferContent, reg3);
  if (noConflict)
    foundSpace =
      instruction.op == "store"
        ? checkSpaceinBufferHelper(storeBuffer, registerFile, ins)
        : checkSpaceinBufferHelper(loadBuffer, registerFile, ins);
  return foundSpace;
};

const checkConflict = (bufferContent, address) => {
  let noConflict = true;
  bufferContent.map(([key, value]) => {
    if (
      value["A"] === parseInt(address) &&
      value["busy"] != 0 &&
      value["time"] != 0
    ) {
      noConflict = false;
    }
    return undefined;
  });
  return noConflict;
};

const checkSpaceinBufferHelper = (buffer, registerFile, ins) => {
  let foundSpace = false;
  let [type, instruction, reg1, reg2, reg3] = ins;
  let bufferContent = Object.entries(buffer);
  bufferContent.map(([key, value]) => {
    if (foundSpace) return undefined;
    if (value["busy"] == 0) {
      if (instruction.op == "store")
        fillInstruction(reg2, "j", registerFile, instruction);
      buffer[key] = instruction;
      foundSpace = true;
      if (instruction.op == "load") registerFile[reg2]["Qi"] = key;
    }
    return undefined;
  });
  return foundSpace;
};

export const issuingTableInstruction = (
  ins,
  unParsedInstruction,
  cycleCount
) => {
  let tableInstruction = {
    instruction: unParsedInstruction,
    issue: cycleCount,
    startExecution: 0,
    endExecution: 0,
    writeResult: 0,
  };
  return tableInstruction;
};
