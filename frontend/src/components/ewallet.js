import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
import Header from "./Header";
import SucessMessage from "./SucessMessage";

const Ewallet = () => {
  const [amount, setAmount] = useState("");
  const [confirmAmount, setConfirmAmount] = useState("");
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);
  const form = useRef();
  const userInfo = localStorage.getItem("userInfo");
  const addbooking = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      var driverMailId = JSON.parse(userInfo).email,
        description = "Deposit",
        transactionAmount = amount,
        debitType = "credit";

      const { data } = await axios.put(
        "/api/users/addMoney",
        {
          driverMailId,
          description,
          transactionAmount,
          debitType,
        },
        config
      );

      setSucess("SucessFully added the amount " + amount);
      setAmount(0);
      setConfirmAmount(0);
    } catch (error) {
      setError("Error while adding amount");
    }
  };
  return (
    <div>
      {" "}
      <Header />
      <Container>
        {error && <ErrorMessage message={error} />}
        {sucess && <SucessMessage message={sucess} />}
        <Form ref={form}>
          <Form.Label>Deposit Amount</Form.Label>
          <Form.Control
            type="text"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />

          <Form.Label>Confirm Deposit Amount</Form.Label>
          <Form.Control
            type="text"
            value={confirmAmount}
            placeholder="Confirm amount "
            onChange={(e) => setConfirmAmount(e.target.value)}
          />

          <br></br>

          <Button variant="primary" size="sm" onClick={addbooking}>
            Deposit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Ewallet;
