import React from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LandingPage.css";

export const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to E-Parking Solutions</h1>
              <p className="subtitle">One place for all your parking needs</p>
            </div>
            <div className="buttonContainer">
              <Button size="lg" className="landingbutton">
                Login
              </Button>

              <Button
                variant="outline-primary"
                size="lg"
                className="landingbutton"
              >
                Signup
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default LandingPage;
