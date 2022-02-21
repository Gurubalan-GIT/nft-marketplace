import { Col } from "antd";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Col className="h-screen" >
      <Navbar />
      <Hero />
    </Col>
  );
}

export default Home;