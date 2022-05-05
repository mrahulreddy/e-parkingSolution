import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {
  Col,
  Form,
  Row,
  Container,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import TimePicker from "./TimePicker";

import AddPlaces from "./addPlaces";
import AddAdmin from "./addAdmin";
import BookPlace from "./bookPlace";
import Reports from "./reports";
const Dashboard = () => {
  const [isadmin, setIsadmin] = useState(false);
  const [isowner, setIsowner] = useState(false);
  const [isdriver, setIsdriver] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setIsadmin(JSON.parse(userInfo).isAdmin);
    setIsowner(JSON.parse(userInfo).isOwner);
    setIsdriver(true);
  }, []);

  function addplaces() {}

  return (
    <div>
      <Container>
        <h1>
          <center>
            {isadmin && "Admin "}
            {isowner && "Land Owner "}
            {isdriver && "User "}
            Dashboard
          </center>
        </h1>
      </Container>
      <Container>
        {(isadmin || isowner) && (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                <Card.Header> Add Places :</Card.Header>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AddPlaces />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}

        {(isadmin || isowner || isdriver) && (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                <Card.Header> Book Places :</Card.Header>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <BookPlace />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}

        {isadmin && (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                <Card.Header> Add Admin :</Card.Header>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AddAdmin />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}

        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
              <Card.Header> Reports :</Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Reports />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    </div>
  );
};

export default Dashboard;
