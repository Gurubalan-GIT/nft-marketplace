import { useWeb3 } from "@3rdweb/hooks";
import { LoginOutlined } from "@ant-design/icons";
import { Col, message } from "antd";
import { useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { client as sanityClient } from "../lib/sanity-client";

const Home = () => {
  const { address } = useWeb3();

  const initializeUserInSanity = async () => {
    try {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "",
        walletAddress: address,
      };
      const result = await sanityClient.createIfNotExists(userDoc);
      message.success({
        content: `Welcome back ${result?.userName}!`,
        type: "success",
        duration: 2,
        className: "flex flex-col items-center justify-center ",
        icon: <LoginOutlined />,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (!address) return;
    initializeUserInSanity();
  }, [address]);

  return (
    <Col className="h-screen">
      <Navbar />
      <Hero />
    </Col>
  );
};

export default Home;
