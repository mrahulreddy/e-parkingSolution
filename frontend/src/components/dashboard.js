import React from "react";
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
import users_data from "../data/users";
import AddPlaces from "./addPlaces";
import AddAdmin from "./addAdmin";
import BookPlace from "./bookPlace";
import Reports from "./reports";
const dashboard = () => {
  return (
    <div>
      <Container>
        <h1>
          <center>Admin Dashboard</center>
        </h1>
      </Container>
      <Container>
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

export default dashboard;
