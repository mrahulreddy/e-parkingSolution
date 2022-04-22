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
} from "react-bootstrap";
import TimePicker from "./TimePicker";

const dashboard = () => {
  return (
    <div>
      <Container>
        <h1>
          <center>Admin Dashboard</center>
        </h1>
      </Container>
      <Container>
        <Form>
          <h2> Add Places :</h2>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Place name</Form.Label>
            <Form.Control type="text" placeholder="Enter Place" />
            <Form.Label>Start time</Form.Label>
            <TimePicker />
            <Form.Label>End time</Form.Label>
            <TimePicker />
            <Form.Label>Number of slots</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter total number of parking space available here"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <hr />
      </Container>

      <Container>
        <h2> Book Parking Place :</h2>
        <hr />

        <select name="places" id="places">
          <option value="" disabled selected>
            Choose Places
          </option>
          <option value="Abbey Wood">Abbey Wood </option>
          <option value="Acton">Acton </option>
          <option value="Acton Green">Acton Green </option>
          <option value="Addington">Addington </option>
          <option value="Addiscombe">Addiscombe </option>
          <option value="Aldborough Hatch ">Aldborough Hatch </option>
          <option value="Aldersbrook">Aldersbrook </option>
          <option value="Alperton">Alperton </option>
          <option value="Anerley">Anerley </option>
        </select>
      </Container>
    </div>
  );
};

export default dashboard;
