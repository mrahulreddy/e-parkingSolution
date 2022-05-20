import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import "./aboutus.css";
const Aboutus = () => {
  return (
    <div>
      {" "}
      <Header />
      <div class="main">
        <Container>
          <h1>ABOUT US</h1>
          <div class="aboutus">
            I have doing this project for academic purpose.. later I have a plan
            to improve this project and market it to the near by parking land
            owners.
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Aboutus;
