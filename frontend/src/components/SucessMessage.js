import React from "react";
import { Alert } from "react-bootstrap";

const SucessMessage = ({ variant = "success", message }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{message}</strong>
    </Alert>
  );
};

export default SucessMessage;
