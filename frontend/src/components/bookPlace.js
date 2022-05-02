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
import DatePicker from "sassy-datepicker";

const BookPlace = () => {
  const [pdata, setpdata] = useState([]);
  const [stime, setStime] = useState("10:00");
  const [sdate, setSdate] = useState("");
  const [splace, setSplace] = useState("...");
  const get_place_data = async () => {
    const { data } = await axios.get("/api/users/getplaces");

    setpdata(data);
  };

  useEffect(() => {
    document
      .getElementById("places-options")
      .addEventListener("change", function () {
        setSplace(this.value);
      });

    get_place_data();
    var date3 = new Date();

    const datestr =
      date3.getFullYear() +
      "" +
      ("0" + (date3.getMonth() + 1)).slice(-2) +
      "" +
      ("0" + date3.getDate()).slice(-2);

    setSdate(datestr);
  }, []);

  const bookPlaces = (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  const getSelectedDate = async (date) => {
    var date1 = await Date.parse(date.toString());

    var date3 = await new Date(date1);

    const datestr = await (date3.getFullYear() +
      "" +
      ("0" + (date3.getMonth() + 1)).slice(-2) +
      "" +
      ("0" + date3.getDate()).slice(-2));

    await setSdate(datestr);
  };

  return (
    <div>
      <Container>
        <Form onSubmit={bookPlaces}>
          <select name="places" id="places-options">
            <option selected>choose places</option>
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
              <DatePicker onChange={getSelectedDate} />
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
              Number of available space in {splace} on {sdate} at {stime}
            </Form.Label>
          </Row>
          <hr />
        </Form>
      </Container>
    </div>
  );
};

export default BookPlace;
