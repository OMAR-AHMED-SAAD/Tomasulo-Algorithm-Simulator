import { Link } from "react-router-dom";
import { Button, Image } from "antd";
import tomasuloImage from "../imgs/tomasulo.png";
import robertTomasulo from "../imgs/robert-tomasulo.jpg";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="images-container">
        <div>
          <Image width={150} alt="Robert Tomasulo" src={robertTomasulo} />
          <p style={{ marginTop: "10px" }}>
            <strong>Robert Tomasulo</strong>
          </p>
        </div>
        <div>
          <Image width={200} src={tomasuloImage} alt="Architecture Image" />
          <p style={{ marginTop: "10px" }}>
            <strong>Tomasulo Architecture</strong>
          </p>
        </div>
      </div>
      <h1>Welcome to Tomasulo Algorithm Simulation</h1>
      <p>Explore and simulate the Tomasulo algorithm</p>
      <div style={{ marginTop: "30px" }}>
        <Link to="/configure">
          <Button type="primary" style={{ marginRight: "20px" }}>
            Configure Architecture
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
