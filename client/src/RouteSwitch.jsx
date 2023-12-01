import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import InputForms from "./components/InputForms";
import Simulation from "./components/Simulation";
const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/configure" element={<InputForms />} />
      <Route path="/simulation" element={<Simulation />} />
    </Routes>
  );
};
export default RouteSwitch;
