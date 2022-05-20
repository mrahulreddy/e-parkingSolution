import "./seatMap.css";
import "./bookplace.css";
import moment from "moment";
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
  const { pdata, get_place_data, symbol } = props;

  const [bookingdata, setBookingdata] = useState([]);
  const [oldbookedSeats, setOldBookedSeats] = useState("");
  var oldredseats = "";
  var redSeatcount = 0;
  var paymentSucess = false;
  const [stime, setStime] = useState("10:00");
  const [nos, setNos] = useState("0");
  const [nbs, setNbs] = useState("0");
  const [totalSeat, setTotalSeat] = useState(0);
  const [sdate, setSdate] = useState("");
  const [splace, setSplace] = useState("...");
  const [rseat, setRseat] = useState(0);
  const [amount, setAmount] = useState(0);
  const [rhrs, setRhrs] = useState("1");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState();
  const [bookedSeats, setBookedSeats] = useState("");
  const [bookedSeatcnt, setBookedSeatcnt] = useState(0);
  const userInfo = localStorage.getItem("userInfo");

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
    var total_seats = totalSeat;

    var seat_names = [];
    var old_boked_seats = [];
    try {
      old_boked_seats = oldbookedSeats.split(",");
      console.log(old_boked_seats, "No error in split");
      console.log(oldredseats, "oldredseats");
    } catch (error) {
      old_boked_seats = [","];
      console.log("error in split");
    }
    console.log(old_boked_seats, "old_boked_seats in content");
    var inc = 0;
    for (let ac = 65, coun = 0; ac < 91 && coun < total_seats; ac++) {
      for (let index = 1; index < 11 && coun < total_seats; index++, coun++) {
        var seatname = (inc > 0 ? inc : "") + String.fromCharCode(ac) + index;

        var notfound = true;
        for (
          let index1 = 0;
          index1 < old_boked_seats.length && notfound;
          index1++
        ) {
          if (seatname === old_boked_seats[index1]) {
            seat_names.push(seatname + "|Y");
            notfound = false;
            redSeatcount++;
            // setNbs(redSeatcount);
          }
        }

        if (notfound) {
          seat_names.push(seatname + "|N");
        }
      }
      if (ac == 90) {
        ac = 64;
        inc++;
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
              title={sn}
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

  const get_booking_data = async (e) => {
    const getbookinginfo = await axios.get("/api/users/getBookings");
    setBookingdata(getbookinginfo.data);
    console.log("path1");
    console.log(bookingdata);
    console.log("path1.1");
    // bookingdata.map((dat) => {
    //   console.log(dat.seats, "dat.seats outer");
    //   oldredseats = oldredseats + "," + dat.seats.toString();
    // });

    var firsttime = true;
    var arrtime = stime.split(":");
    bookingdata.map((dat) => {
      if (dat.place.toString() === splace.toString()) {
        console.log(dat.seats, "dat.seats ");

        for (let index = 0; index < rhrs; index++) {
          if (dat.startTime == parseInt(arrtime[0]) + index) {
            oldredseats = oldredseats + "," + dat.seats.toString();
            console.log(oldredseats, "in old red");
            setOldBookedSeats(oldredseats);
          }
        }
      }
    });

    console.log(oldbookedSeats, "oldbookedSeats inner");
  };

  const get_available_seat = async (e) => {
    e.preventDefault();
    setSucess(false);
    setError(false);
    setOldBookedSeats("");
    setBookedSeats("");
    setBookedSeatcnt(0);
    await get_booking_data(e);
    console.log("path2");
    pdata.map((dat) => {
      if (dat.placeName.toString() === splace.toString()) {
        setAmount(dat.aph);
        setTotalSeat(dat.nos);
        setNbs(redSeatcount);
        setNos(parseInt(dat.nos) - redSeatcount);
      }
    });
  };

  useEffect(() => {
    get_booking_data();
    setError(false);
    setSucess(false);
    document
      .getElementById("places-options")
      .addEventListener("change", function () {
        setSplace(this.value);
        setNos(0);
        setTotalSeat(0);
      });

    // get_booking_data();

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

  const makeBookingPayment = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      var driverMailId = JSON.parse(userInfo).email,
        description =
          "Payment for " +
          splace +
          " " +
          bookedSeatcnt +
          " parking space(s)  for " +
          rhrs +
          " hour(s)",
        transactionAmount =
          parseInt(amount) * parseInt(bookedSeatcnt) * parseInt(rhrs),
        debitType = "debit";
      if (
        window.confirm(
          "Please confirm the \n" +
            description +
            "\n Amount =" +
            transactionAmount
        )
      ) {
        const { data } = await axios.put(
          "/api/users/moneytransaction",
          {
            driverMailId,
            description,
            transactionAmount,
            debitType,
          },
          config
        );
        console.log("true after add money");
        paymentSucess = true;
      } else {
        paymentSucess = false;
      }
      get_place_data(e);
    } catch (err) {
      setError(err.response.data.message);
      paymentSucess = false;
    }
  };

  const bookSeats = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      var arrtime = stime.split(":");
      var driverMailId = JSON.parse(userInfo).email;
      var date = sdate;
      var startTime = arrtime[0];
      var totalHours = rhrs;
      var place = splace;
      var seats = bookedSeats;

      await makeBookingPayment(e);
      console.log(paymentSucess, "payment status");
      if (paymentSucess) {
        const { data } = await axios.put(
          "/api/users/bookseats",
          {
            driverMailId,
            date,
            startTime,
            totalHours,
            place,
            seats,
            amount,
          },
          config
        );

        setSucess("Sucessfully Booked the place");
        setError(false);
        get_place_data(e);
      }
    } catch (err) {}

    setBookedSeats("");
    setBookedSeatcnt(0);
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
        <Form>
          {error && <ErrorMessage message={error} />}
          {sucess && <SucessMessage message={sucess} />}
          <center>
            <table>
              <tr>
                <td rowspan={4}>
                  <DatePicker onChange={getSelectedDate} />
                </td>
                <td align="right">
                  <Form.Label>Select Place:</Form.Label>
                </td>
                <td>
                  <select name="places" id="places-options">
                    <option selected>choose places</option>
                    {pdata.map((dat) => (
                      <option> {dat.placeName} </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td align="right">
                  <Form.Label>Start time:</Form.Label>
                </td>
                <td>
                  <TimePicker
                    isOpen="true"
                    disableClock="true"
                    onChange={setStime}
                    value={stime}
                  />
                </td>
              </tr>
              <tr>
                <td align="right">
                  <Form.Label>Required Hours:</Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={rhrs}
                    onChange={(e) => setRhrs(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button variant="primary" onClick={get_available_seat}>
                    Check availablity
                  </Button>
                </td>
                <td align="right">
                  <Button
                    variant="primary"
                    disabled={bookedSeatcnt > 0 ? false : true}
                    onClick={bookSeats}
                  >
                    Book Place
                  </Button>
                </td>
              </tr>
              <tr>
                <td colspan={3} align="center">
                  <Form.Label>
                    Number of available space in{" "}
                    <u style={{ color: "#2b87e3", fontSize: "20px" }}>
                      {splace}{" "}
                    </u>
                    on{" "}
                    <u style={{ color: "#2b87e3", fontSize: "20px" }}>
                      {moment(sdate).format("MM/DD/YYYY")}
                    </u>{" "}
                    at{" "}
                    <u style={{ color: "#2b87e3", fontSize: "20px" }}>
                      {stime}
                    </u>{" "}
                    is{" "}
                    <u style={{ color: "#2b87e3", fontSize: "20px" }}>{nos}</u>{" "}
                    for{" "}
                    <u style={{ color: "#2b87e3", fontSize: "20px" }}>
                      {amount} {symbol}
                    </u>{" "}
                    per/Hour
                  </Form.Label>
                </td>
              </tr>
            </table>
          </center>
        </Form>
        <div>
          {/* <Table borderless> */}
          <Table borderless size="sm">
            {/* <Table hover size="sm"> */}
            <thead>
              <tr>
                <th colSpan={10}>
                  <center>Available Seats</center>
                </th>
              </tr>
              <tr>
                <th colSpan={10}>
                  {/* <center> */}
                  Selected booking slots are: {bookedSeats} | Total Seats :{" "}
                  {bookedSeatcnt}
                  <hr></hr>
                  {/* </center> */}
                </th>
              </tr>
            </thead>

            {content()}
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default BookPlace;
