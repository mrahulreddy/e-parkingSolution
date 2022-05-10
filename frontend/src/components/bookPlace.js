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
import ErrorMessage from "./ErrorMessage";
import SucessMessage from "./SucessMessage";

const BookPlace = () => {
  const [pdata, setpdata] = useState([]);
  const [stime, setStime] = useState("10:00");
  const [nos, setNos] = useState("0");
  const [sdate, setSdate] = useState("");
  const [splace, setSplace] = useState("...");
  const [rseat, setRseat] = useState("1");
  const [rhrs, setRhrs] = useState("1");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState();

  const get_place_data = async () => {
    const { data } = await axios.get("/api/users/getplaces");
    setpdata(data);
  };

  const get_available_seat = async () => {
    console.log(pdata);
    await pdata.map((dat) => {
      if (dat.placeName.toString() === splace.toString()) {
        setNos(dat.nos - dat.nbs);

        if (dat.nos - dat.nbs - rseat < 0) {
          setError("Required seat not available");
        } else {
          setError(false);
        }
      }
    });
  };

  useEffect(() => {
    setError(false);
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

  const bookPlaces = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      var placeName = splace;
      const { data } = await axios.put(
        "/api/users/updatebook",
        {
          placeName,
          nos,
        },
        config
      );
      setSucess("Sucessfully Booked the place");
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
          {error && <ErrorMessage message={error} />}
          {sucess && <SucessMessage message={sucess} />}
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

              <Form.Control
                type="text"
                value={rhrs}
                onChange={(e) => setRhrs(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Number of slots</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number of space needed "
                value={rseat}
                onChange={(e) => setRseat(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={get_available_seat}>
                Check availablity
              </Button>
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Book Place
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Label>
              Number of available space in {splace} on {sdate} at {stime} is =
              {nos}
            </Form.Label>
          </Row>
          <hr />
        </Form>
      </Container>
    </div>
  );
};

export default BookPlace;
