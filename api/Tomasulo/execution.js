export const executeAddSub = (
  addSubReservationStation,
  latencies,
  issuingTable,
  cycleCount
) => {
  Object.values(addSubReservationStation).forEach((station) => {
    if (station.busy == 1) {
    // to know when to start execution the time should be equal to latency and qj and qk = 0
      if (
        station.Time == parseInt(latencies[station.op]) &&
        station.Qj == 0 &&
        station.Qk == 0
      ) {
        issuingTable.find(
          (instruction) => instruction.issue == station.issueCycle
        ).startExecution = cycleCount;
      }
      
      if (station.Time > 1 && station.Qj == 0 && station.Qk == 0) { 
        // decrement time in the same cycle when we start 
        // for example if an instruction needs 2 cycles and it starts at cycle 3 then it finishes in cycle 4
        station.Time--;
      } else if (station.Time == -1) { 
        // set time to latency when issued
        station.Time = parseInt(latencies[station.op]);
      }
    }
  });
};

export const executeMultDiv = (
  multDivReservationStation,
  latencies,
  issuingTable,
  cycleCount
) => {
  Object.values(multDivReservationStation).forEach((station) => {
    if (station.busy == 1) {
        if (
            station.Time == parseInt(latencies[station.op]) &&
            station.Qj == 0 &&
            station.Qk == 0
          ) {
            issuingTable.find(
              (instruction) => instruction.issue == station.issueCycle
            ).startExecution = cycleCount;
          }
      if (station.Time > 1 && station.Qj == 0 && station.Qk == 0)
        station.Time--;
      else if (station.Time == -1)
        station.Time = parseInt(latencies[station.op]);
    }
  });
};

export const executeLoad = (loadBuffer, latencies, issuingTable,cycleCount) => {
  Object.values(loadBuffer).forEach((buffer) => {
    if (buffer.busy == 1) {
        if (
            buffer.Time == parseInt(latencies[buffer.op])
          ) {
            issuingTable.find(
              (instruction) => instruction.issue == buffer.issueCycle
            ).startExecution = cycleCount;
          }
      if (buffer.Time > 1) buffer.Time--;
      else if (buffer.Time == -1) buffer.Time = parseInt(latencies[buffer.op]);
    }
  });
};

export const executeStore = (storeBuffer, latencies, issuingTable,cycleCount) => {
  Object.values(storeBuffer).forEach((buffer) => {
    if (buffer.busy == 1) {
        if (
            buffer.Time == parseInt(latencies[buffer.op]) &&
            buffer.Qj == 0
          ) {
            issuingTable.find(
              (instruction) => instruction.issue == buffer.issueCycle
            ).startExecution = cycleCount;
          }
      if (buffer.Time > 1 && station.Qj == 0) buffer.Time--;
      else if (buffer.Time == -1) buffer.Time = parseInt(latencies[buffer.op]);
    }
  });
};
