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
import Header from "../components/Header";

import "./LandingPage.css";

export const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <div>
                <h1 className="title">Welcome to E-Parking Solutions</h1>
                <p className="subtitle">One place for all your parking needs</p>
              </div>
              <div className="buttonContainer">
                <Link to="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" className="landingbutton">
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default LandingPage;
