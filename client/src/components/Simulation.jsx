import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../api";
import { Button, Spin } from "antd";
import ConditionalRender from "./ConditionalRender/ConditionalRender";
import ReservationStation from "./ReservationStation";
import LoadBuffer from "./LoadBuffer";
import StoreBuffer from "./StoreBuffer";
import IssuingTable from "./IssuingTable";
import RegisterFile from "./RegisterFile";
import Cache from "./Cache";
const Simulation = () => {
  const [cycles, setCycles] = useState([]);
  const [currentCycle, setCurrentCycle] = useState({});
  const [currentCycleCount, setCurrentCycleCount] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function fetchData() {
      while (true) {
        const { data } = await axios.get(`${baseApiUrl}/getResults`);
        setCycles(data);
        setCurrentCycle(data[0]);
        setLoad(true);
        if (data.length != 0) break;
      }
    }
    fetchData();
  }, []);

  const handleNextCycle = () => {
    if (currentCycleCount < cycles.length) {
      setCurrentCycle(cycles[currentCycleCount + 1]);
      setCurrentCycleCount(currentCycleCount + 1);
    }
  };
  const handleBackCycle = () => {
    if (currentCycleCount > 0) {
      setCurrentCycle(cycles[currentCycleCount - 1]);
      setCurrentCycleCount(currentCycleCount - 1);
    }
  };

  return load ? (
    <div>
      <h2>Cycle: {currentCycle.cycle}</h2>
      <IssuingTable issuingTable={currentCycle.issuingTable} />
      <ReservationStation stationData={currentCycle.addSubReservationStation} />
      <ReservationStation
        stationData={currentCycle.multDivReservationStation}
      />
      <LoadBuffer loadBuffer={currentCycle.loadBuffer} />
      <StoreBuffer storeBuffer={currentCycle.storeBuffer} />
      <RegisterFile registerFile={currentCycle.registerFile} />
      <Cache cache={currentCycle.cache} />
      <ConditionalRender condition={currentCycleCount !== 0}>
        <Button onClick={handleBackCycle}>Back</Button>
      </ConditionalRender>
      <ConditionalRender condition={currentCycleCount !== cycles.length-1}>
        <Button onClick={handleNextCycle}>Next</Button>
      </ConditionalRender>
    </div>
  ) : (
    <Spin size="large" />
  );
};
export default Simulation;
