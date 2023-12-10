import { startSimulation, setLatency, setSizes } from "./Tomasulo.js";

const startSimulationFromServer = async () => {
  setLatency({
    sub: 1,
    add: 4,
    mul: 6,
    div: 1,
    load: 1,
    store: 1,
    subi: 1,
    addi: 1,
    bnez: 1,
  });
  setSizes({ addSize: 3, mulSize: 2, loadSize: 3, storeSize: 3 });
  await startSimulation();
};

startSimulationFromServer();
