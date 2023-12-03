import { doLogic } from "./instructions.js";

export const writeInstruction = (
  registerFile,
  addSubReservationStation,
  multDivReservationStation,
  loadBuffer,
  storeBuffer,
  cache,
  issuingTable,
  cycleCount
) => {
  let needToWriteInstructions = [];
  Object.entries(addSubReservationStation).forEach(([key, station]) => {
    if (station.busy == 1 && station.Time == 0)
      needToWriteInstructions.push({ key, station });
  });
  Object.entries(multDivReservationStation).forEach(([key, station]) => {
    if (station.busy == 1 && station.Time == 0)
      needToWriteInstructions.push({ key, station });
  });
  Object.entries(loadBuffer).forEach(([key, station]) => {
    if (station.busy == 1 && station.Time == 0)
      needToWriteInstructions.push({ key, station });
  });
  Object.entries(storeBuffer).forEach(([key, station]) => {
    if (station.busy == 1 && station.Time == 0) station.busy = 0;
  });

  if (needToWriteInstructions.length == 0) return;
  //earliest issue
  const needToWriteInstruction = needToWriteInstructions.sort(
    (a, b) => a.station.issueCycle - b.station.issueCycle
  )[0];

  //publish result
  publishResult(
    registerFile,
    addSubReservationStation,
    multDivReservationStation,
    storeBuffer,
    needToWriteInstruction,
    cache,
    issuingTable,
    cycleCount
  );
  // remove from station or buffer
  removeFromStationOrBuffer(
    needToWriteInstruction.key,
    addSubReservationStation,
    multDivReservationStation,
    loadBuffer
  );
};

const removeFromStationOrBuffer = (
  key,
  addSubReservationStation,
  multDivReservationStation,
  loadBuffer
) => {
  switch (key[0].toLowerCase()) {
    case "a":
      addSubReservationStation[key].busy = 0;
      break;
    case "m":
      multDivReservationStation[key].busy = 0;
      break;
    case "l":
      loadBuffer[key].busy = 0;
      break;
  }
};

const publishResult = (
  registerFile,
  addSubReservationStation,
  multDivReservationStation,
  storeBuffer,
  needToWriteInstruction,
  cache,
  issuingTable,
  cycleCount 
) => {
  // TODO
  const { key, station } = needToWriteInstruction;
  const result = doLogic(station, cache);

  updateRegisterFile(registerFile, key, result);
  updateReservationStation(addSubReservationStation, key, result);
  updateReservationStation(multDivReservationStation, key, result);
  updateStoreBuffer(storeBuffer, key, result);

  let instruction = issuingTable.find(
    (instruction) => instruction.issue == station.issueCycle
  );
  instruction.writeResult=cycleCount;
};

const updateRegisterFile = (registerFile, key, result) => {
  Object.entries(registerFile).forEach(([reg, obj]) => {
    if (obj.Qi === key) {
      obj.value = result;
      obj.Qi = 0;
    }
  });
};

const updateReservationStation = (reservationStation, key, result) => {
  Object.entries(reservationStation).forEach(([keyName, currStation]) => {
    if (currStation.Qj === key) {
      currStation.Vj = result;
      currStation.Qj = 0;
    }
    if (currStation.Qk === key) {
      currStation.Vk = result;
      currStation.Qk = 0;
    }
  });
};

const updateStoreBuffer = (storeBuffer, key, result) => {
  Object.entries(storeBuffer).forEach(([keyName, currStation]) => {
    if (currStation.Qj === key) {
      currStation.Vj = result;
      currStation.Qj = 0;
    }
  });
};
