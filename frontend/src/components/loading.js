import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 100 }) {
  return (
    <div>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
