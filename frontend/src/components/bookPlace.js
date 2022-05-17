import "./seatMap.css";
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
  Table,
} from "react-bootstrap";

import axios from "axios";
import TimePicker from "react-time-picker";
import DatePicker from "sassy-datepicker";
import ErrorMessage from "./ErrorMessage";
import SucessMessage from "./SucessMessage";
import SeatMap from "./seatMap";

const BookPlace = (props) => {
  const { pdata, get_place_data } = props;
  // const [pdata, setpdata] = useState([]);
  const [stime, setStime] = useState("10:00");
  const [nos, setNos] = useState("0");
  const [totalSeat, setTotalSeat] = useState(0);
  const [sdate, setSdate] = useState("");
  const [splace, setSplace] = useState("...");
  const [rseat, setRseat] = useState("1");
  const [rhrs, setRhrs] = useState("1");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState();
  const [bookedSeats, setBookedSeats] = useState("");
  const [bookedSeatcnt, setBookedSeatcnt] = useState(0);

  const selectedSeat = (selSeat, status) => {
    if ("N" === status) {
      let result = bookedSeats.indexOf(selSeat);
      if (result >= 0) {
        document.getElementById(selSeat).style.backgroundColor =
          "rgb(43, 255, 0)";
        if (result > 0) {
          setBookedSeats(bookedSeats.replace("," + selSeat, ""));
        } else {
          setBookedSeats(bookedSeats.replace(selSeat + ",", ""));
        }
        if (parseInt(bookedSeatcnt) - 1 <= 0) {
          setBookedSeats("");
        }

        setBookedSeatcnt(bookedSeatcnt - 1);
      } else {
        document.getElementById(selSeat).style.backgroundColor =
          "rgb(184, 134, 11)";

        if (bookedSeatcnt > 0) {
          setBookedSeats(bookedSeats + "," + selSeat);
        } else {
          setBookedSeats(selSeat);
        }

        setBookedSeatcnt(bookedSeatcnt + 1);
      }
    }
  };

  function content() {
    let seatContent = [];
    var cnt = 0;
    var total_seats = 15;

    var seat_names = [];

    for (let ac = 65; ac < 91; ac++) {
      for (let index = 1; index < 11; index++) {
        seat_names.push(String.fromCharCode(ac) + index + "|N");
      }
    }
    var rows = total_seats / 10;
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < 10; i++) {
        cnt++;
        if (cnt > total_seats) {
          break;
        }
        var text = seat_names[cnt - 1];
        const valArray = text.split("|");
        let sn = valArray[0];
        let status = valArray[1];
        let clr = "rgb(43, 255, 0)";
        if ("Y" === status) {
          clr = "red";
          // console.log(text);
          // console.log(clr);
        }
        seatContent.push(
          <td>
            <div
              class="seat"
              id={sn}
              key={sn}
              style={{ background: clr }}
              onClick={() => selectedSeat(sn, status)}
            >
              {sn}
            </div>
          </td>
        );
      }
      seatContent.push(<tr />);
    }
    return seatContent;
  }

  // const get_place_data = async () => {
  //   const { data } = await axios.get("/api/users/getplaces");
  //   setpdata(data);
  // };

  const get_available_seat = async () => {
    console.log(pdata, "pdata");

    await pdata.map((dat) => {
      if (dat.placeName.toString() === splace.toString()) {
        setTotalSeat(parseInt(dat.nos));
        setNos(parseInt(dat.nos) - parseInt(dat.nbs));

        if (parseInt(dat.nos) - parseInt(dat.nbs) - parseInt(rseat) < 0) {
          setError("Required seat not available");
        } else {
          setError(false);
        }
      } else {
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

    // get_place_data();
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
      var nbs = rseat;
      const { data } = await axios.put(
        "/api/users/updatebook",
        {
          placeName,
          nbs,
        },
        config
      );
      setSucess("Sucessfully Booked the place");
      get_place_data();
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
              Number of available space in {splace} on {sdate} at {stime} is
              <h1 style={{ color: "red" }}>{nos}</h1>
            </Form.Label>
          </Row>
        </Form>
        <div>
          {/* <Table borderless> */}
          <Table borderless size="sm">
            {/* <Table hover size="sm"> */}
            <thead>
              <tr>
                <th colSpan={10}>
                  <center>
                    Available Seats<hr></hr>
                  </center>
                </th>
              </tr>
            </thead>
            {content()}
          </Table>
          Selected booking slots are: {bookedSeats} | Total Seats :{" "}
          {bookedSeatcnt}
        </div>
      </Container>
    </div>
  );
};

export default BookPlace;
