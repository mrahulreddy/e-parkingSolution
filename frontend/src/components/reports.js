import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const Reports = (props) => {
  const { pdata } = props;
  const [pdata2, setPdata2] = useState([]);
  const [bookdata, setBookingdata] = useState([]);
  const [uid, setUserid] = useState("");
  const [isadmin, setIsadmin] = useState(false);
  const [isowner, setIsowner] = useState(false);
  const [isdriver, setIsdriver] = useState(true);
  const [udata, setUdata] = useState([]);
  const [suser, setSuser] = useState([]);
  var cnt = 1;
  var cnt2 = 1;
  var cnt3 = 1;
  const get_users_data = async () => {
    const { data } = await axios.get("/api/users/getusers");
    setUdata(data);
  };

  const get_booking_data = async () => {
    const { data } = await axios.get("/api/users/getBookings");
    setBookingdata(data);
  };

  const get_place_data = async () => {
    const getplaces = await axios.get("/api/users/getplaces");
    setPdata2(getplaces.data);
  };

  const addAsAdmin = async (email) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/users/addadmin",
        {
          email,
        },
        config
      );
      get_users_data();
      // setSucess("Sucessfully Added as Admin");
    } catch (error) {}
  };

  const removeAdminAccess = async (email) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/users/removeAdmin",
        {
          email,
        },
        config
      );
      get_users_data();
      // setSucess("Sucessfully Added as Admin");
    } catch (error) {}
  };
  const addAsOwner = async (email) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/users/addowner",
        {
          email,
        },
        config
      );
      get_users_data();
    } catch (error) {}
  };

  const removeOwnerAcces = async (email) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/users/removeOwner",
        {
          email,
        },
        config
      );
      get_users_data();
    } catch (error) {}
  };

  const deletePlace = async (place) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (window.confirm("Are you sure to delete the place?")) {
        const { data } = await axios.put(
          "/api/users/deletePlace",
          {
            place,
          },
          config
        );
        await get_place_data();
      }
    } catch (error) {
      console.log("error  ");
    }
  };

  const deleteBooking = async (id) => {
    console.log(id, "id");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (window.confirm("Are you sure to delete the Booking ?")) {
        const { data } = await axios.put(
          "/api/users/deleteBooking",
          {
            id,
          },
          config
        );
        await get_booking_data();
      }
    } catch (error) {
      console.log("error  ");
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setIsadmin(JSON.parse(userInfo).isAdmin);
    setIsowner(JSON.parse(userInfo).isOwner);
    setUserid(JSON.parse(userInfo).email);
    setIsdriver(true);
    get_users_data();
    setPdata2(pdata);
    get_place_data();
    get_booking_data();
  }, []);

  return (
    <div>
      <Container>
        {/* <h5>
          {isadmin && (
            <u>
              <center>{"User Data "}</center>
            </u>
          )}
          {!isadmin && !isowner && (
            <u>
              <center>{"Booked Places"}</center>
            </u>
          )}
        </h5> */}
        {isadmin && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={6}>
                  <center>User Data</center>
                </th>
              </tr>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
                <th>Is Owner</th>
                <th>
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              {udata.map(
                (dat) =>
                  dat.isValidated && (
                    <tr>
                      <td>{cnt && cnt++}</td>
                      <td>{dat.name}</td>
                      <td>{dat.email}</td>
                      <td>{(dat.isAdmin && "True") || "False"}</td>
                      <td>{(dat.isOwner && "True") || "False"}</td>
                      <td>
                        <center>
                          <Button
                            variant="success"
                            onClick={() => addAsAdmin(dat.email)}
                            size="sm"
                          >
                            Add as admin
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => removeAdminAccess(dat.email)}
                            size="sm"
                          >
                            Remove Admin
                          </Button>

                          <Button
                            variant="success"
                            value="abcd"
                            onClick={() => addAsOwner(dat.email)}
                            size="sm"
                          >
                            Add as Owner
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => removeOwnerAcces(dat.email)}
                            size="sm"
                          >
                            Remove Owner
                          </Button>
                        </center>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        )}
        {isadmin && pdata2.length > 0 && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={10}>
                  <center>Place Details</center>
                </th>
              </tr>
              <tr>
                <th>Sno</th>
                <th>Place Name</th>
                <th>Owner Name</th>
                <th>Owner Email</th>
                <th>Place created Date</th>
                <th>Open Time</th>
                <th>Close Time</th>
                <th>Total Seats</th>
                <th>Booked Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pdata2.map((dat) => (
                <tr>
                  <td>{cnt2 && cnt2++}</td>
                  <td>{dat.placeName}</td>
                  <td>{dat.ownerName}</td>
                  <td>{dat.ownerMailId}</td>
                  <td>{moment(dat.createdAt).format("MM/DD/YYYY")}</td>
                  <td>{dat.stime}</td>
                  <td>{dat.etime}</td>
                  <td>{dat.nos}</td>
                  <td>{dat.nbs}</td>
                  <td>
                    <center>
                      <Button
                        variant="danger"
                        onClick={() => deletePlace(dat.placeName)}
                        size="sm"
                      >
                        Delete Place
                      </Button>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!isadmin && isowner && pdata2.length > 0 && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={10}>
                  <center>Place Details</center>
                </th>
              </tr>
              <tr>
                <th>Sno</th>
                <th>Place Name</th>
                <th>Owner Name</th>
                <th>Owner Email</th>
                <th>Place created Date</th>
                <th>Open Time</th>
                <th>Close Time</th>
                <th>Total Seats</th>
                <th>Booked Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pdata2.map(
                (dat) =>
                  dat.ownerMailId == uid.toString() && (
                    <tr>
                      <td>{cnt2 && cnt2++}</td>
                      <td>{dat.placeName}</td>
                      <td>{dat.ownerName}</td>
                      <td>{dat.ownerMailId}</td>
                      <td>{moment(dat.createdAt).format("MM/DD/YYYY")}</td>
                      <td>{dat.stime}</td>
                      <td>{dat.etime}</td>
                      <td>{dat.nos}</td>
                      <td>{dat.nbs}</td>
                      <td>
                        <center>
                          <Button
                            variant="danger"
                            onClick={() => deletePlace(dat.placeName)}
                            size="sm"
                          >
                            Delete Place
                          </Button>
                        </center>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        )}

        {isadmin && bookdata.length > 0 && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={9}>
                  <center>Booking History</center>
                </th>
              </tr>
              <tr>
                <th>Sno</th>
                <th>Place Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>User MailId</th>
                <th>Booked Seats</th>
                <th>Booking Time</th>
                <th>Amount per/Hour</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookdata.map((dat) => (
                <tr>
                  <td>{cnt3 && cnt3++}</td>
                  <td>{dat.place}</td>
                  <td>{dat.startTime + ":00"}</td>
                  <td>{dat.endTime + ":00"}</td>
                  <td>{dat.driverMailId}</td>
                  <td>{dat.seats}</td>
                  {/* <td>{moment(dat.createdAt).format("MM/DD/YYYY")}</td> */}
                  <td>
                    {moment(dat.createdAt).format("YYYY/MMM/DD - hh:mm:ss")}
                  </td>
                  <td>{dat.amount}</td>
                  <td>
                    <center>
                      <Button
                        variant="danger"
                        onClick={() => deleteBooking(dat._id)}
                        size="sm"
                      >
                        Delete Booking
                      </Button>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {isdriver && !isadmin && bookdata.length > 0 && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={9}>
                  <center>Booking History</center>
                </th>
              </tr>
              <tr>
                <th>Sno</th>
                <th>Place Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>User MailId</th>
                <th>Booked Seats</th>
                <th>Booking Time</th>
                <th>Amount per/Hour</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookdata.map(
                (dat) =>
                  dat.driverMailId == uid.toString() && (
                    <tr>
                      <td>{cnt3 && cnt3++}</td>
                      <td>{dat.place}</td>
                      <td>{dat.startTime + ":00"}</td>
                      <td>{dat.endTime + ":00"}</td>
                      <td>{dat.driverMailId}</td>
                      <td>{dat.seats}</td>
                      <td>{moment(dat.createdAt).format("MM/DD/YYYY")}</td>
                      <td>{dat.amount}</td>
                      <td>
                        <center>
                          <Button
                            variant="danger"
                            onClick={() => deleteBooking(dat._id)}
                            size="sm"
                          >
                            Delete Booking
                          </Button>
                        </center>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default Reports;
