import { Col, Skeleton } from "antd";
import React from "react";

const LineLoader = () => {
  return (
    <Col className="h-screen w-full px-10 py-10 flex-col items-center justify-center">
      <Skeleton active paragraph={{ rows: 10 }} />
    </Col>
  );
};

export default LineLoader;
