import React from "react";
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

const bookPlace = () => {
  return (
    <div>
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
        <Row>
          <Col>
            <Form.Label>Start time</Form.Label>
            <TimePicker />
          </Col>
          <Col>
            <Form.Label>Required Hours</Form.Label>

            <Form.Control type="text" />
          </Col>
          <Col>
            <Form.Label>Number of slots</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter number of space needed "
            />
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <Row>
          <Form.Label>
            Number of available space in the selected place and time:
          </Form.Label>
        </Row>
        <hr />
      </Container>
    </div>
  );
};

export default bookPlace;
