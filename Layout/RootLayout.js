import { useWeb3 } from "@3rdweb/hooks";
import { LoginOutlined } from "@ant-design/icons";
import { Col, message } from "antd";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { client as sanityClient } from "../lib/sanity-client";
import { ROOT_ROUTE } from "../localization";

const RootLayout = (props) => {
  const { source, children } = props;
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
      source === ROOT_ROUTE &&
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
    <Col className="min-h-screen justify-center items-center">
      <Navbar />
      {children}
    </Col>
  );
};

export default RootLayout;
