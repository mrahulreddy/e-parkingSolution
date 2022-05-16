import axios from "axios";
import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export const Validation = () => {
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  let navigate = useNavigate();
  const validateUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/users/validate",
        { token },
        config
      );
      if (window.confirm("Successfully registered Login now")) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error Occured");
    }
  };

  const validationStyle = {
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    border: "1px solid black",
    marginTop: "100px",
    marginLeft: "50px",
    marginRight: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  return (
    <div>
      <Header />
      <Container>
        <div style={validationStyle}>
          Rahul E-Parking Solutions
          <br />
          <br />
          <p>
            Dear User, <br /> &nbsp;&nbsp; Please verify your email address to
            complete your E-parking Account.
          </p>
          <center>
            <Form onSubmit={validateUser}>
              <Button type="submit">Click here</Button> to complete the
              verification
            </Form>
          </center>
        </div>
      </Container>
    </div>
  );
};

export default Validation;
