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
import users_data from "../data/users";
const addPlaces = () => {
  return (
    <div>
      <Container>
        <Form>
          <h2> Add Places :</h2>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Place name</Form.Label>
            <Form.Control type="text" placeholder="Enter Place" />
            <Row>
              <Col>
                <Form.Label>Start time</Form.Label>
                <TimePicker />
              </Col>
              <Col>
                <Form.Label>End time</Form.Label>
                <TimePicker />
              </Col>
              <Col>
                <Form.Label>Number of slots</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter total number of parking space available here"
                />
              </Col>
              <Col>
                <Form.Label>Amount Per Hour</Form.Label>
                <Form.Control type="text" />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <hr />
      </Container>
    </div>
  );
};

export default addPlaces;
