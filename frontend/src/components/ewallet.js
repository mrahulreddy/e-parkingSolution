import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Header from "./Header";
import SucessMessage from "./SucessMessage";
import "./ewallet.css";
const Ewallet = () => {
  const [amount, setAmount] = useState(0);
  const [confirmAmount, setConfirmAmount] = useState(0);
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);
  const form = useRef();
  const userInfo = localStorage.getItem("userInfo");
  const search = useLocation().search;

  const statusCheck = async () => {
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

      var successTransaction = new URLSearchParams(search).get("st");
      var failedTransaction = new URLSearchParams(search).get("ft");

      if (successTransaction) {
        try {
          transactionAmount = successTransaction;
          await axios.put(
            "/api/users/moneytransaction",
            {
              driverMailId,
              description,
              transactionAmount,
              debitType,
            },
            config
          );
          setSucess("SucessFully added the amount " + successTransaction);
          setAmount(0);
          setConfirmAmount(0);
        } catch (error) {
          setError("Failed to added the amount " + successTransaction);
        }
      }
      if (failedTransaction) {
        setError("Failed to added the amount " + failedTransaction);
        setAmount(0);
        setConfirmAmount(0);
      }
    } catch (error) {}
  };

  const addDeposit = async (e) => {
    e.preventDefault();
    setError(false);
    setSucess(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (!(amount === confirmAmount)) {
        throw new Error("Amount Not matched");
      }

      var driverMailId = JSON.parse(userInfo).email,
        description = "Deposit",
        transactionAmount = amount,
        debitType = "credit";

      const data = await axios.post(
        "/api/users/addMoney",
        {
          transactionAmount,
          debitType,
        },
        config
      );

      window.location = data.data.url;
      //  moneytransaction;
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    statusCheck();
  }, []);

  return (
    <div>
      {" "}
      <Header />
      <div class="ewallet">
        <Container>
          <h1>Payment portal</h1>
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

            <Button
              variant="primary"
              size="sm"
              onClick={addDeposit}
              disabled={amount > 0 && confirmAmount > 0 ? false : true}
            >
              Deposit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Ewallet;
