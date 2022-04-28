import React, { useEffect, useState } from "react";
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

import axios from "axios";
import TimePicker from "react-time-picker";

const BookPlace = () => {
  const [pdata, setpdata] = useState([]);
  const [stime, setStime] = useState("10:00");
  const get_place_data = async () => {
    const { data } = await axios.get("/api/users/getplaces");

    setpdata(data);
  };

  useEffect(() => {
    get_place_data();
  }, []);

  return (
    <div>
      <Container>
        <h2> Book Parking Place :</h2>
        <hr />

        <select name="places" id="places">
          {pdata.map((dat) => (
            <option> {dat.placeName} </option>
          ))}
        </select>
        <Row>
          <Col>
            <Form.Label>Start time</Form.Label>
            <TimePicker
              isOpen="true"
              disableClock="true"
              onChange={setStime}
              value={stime}
            />
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

export default BookPlace;
