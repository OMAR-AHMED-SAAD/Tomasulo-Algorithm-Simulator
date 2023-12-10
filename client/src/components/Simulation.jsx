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
import "../css/simulation.css";
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
      <div className="simulation-header">
        <h1>Cycle: {currentCycle?.cycle}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <Button
            size="large"
            type="primary"
            onClick={handleBackCycle}
            disabled={currentCycleCount == 0}
          >
            Back
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={handleNextCycle}
            disabled={currentCycleCount == cycles.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>Issuing Table</h3>
          <IssuingTable issuingTable={currentCycle?.issuingTable} />
        </div>
        <div>
          <h3>Register File</h3>
          <RegisterFile registerFile={currentCycle?.registerFile} />
        </div>
        <div>
          <h3>Cache</h3>
          <Cache cache={currentCycle?.cache} />
        </div>
      </div>
      <div className="reservation-stations-grid">
        <div>
          <h3>Add/Sub Reservation Station</h3>
          <ReservationStation
            stationData={currentCycle?.addSubReservationStation}
          />
        </div>
        <div>
          <h3>Mult/Div Reservation Station</h3>
          <ReservationStation
            stationData={currentCycle?.multDivReservationStation}
          />
        </div>
        <div>
          <h3>Load Buffer</h3>
          <LoadBuffer loadBuffer={currentCycle?.loadBuffer} />
        </div>
        <div>
          <h3>Store Buffer</h3>
          <StoreBuffer storeBuffer={currentCycle?.storeBuffer} />
        </div>
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
};
export default Simulation;
