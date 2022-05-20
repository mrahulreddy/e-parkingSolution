import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import Header from "./Header";
import SucessMessage from "./SucessMessage";

const Lanwownerrequest = () => {
  const [sucess, setSucess] = useState();
  const requestOwner = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const userInfo = localStorage.getItem("userInfo");

      var email = JSON.parse(userInfo).email;
      const { data } = await axios.put(
        "/api/users/requestOwner",
        {
          email,
        },
        config
      );
      setSucess("Requested you as a Land Owner..");
    } catch (error) {}
  };

  return (
    <div>
      <Header />

      <Container>
        <center>
          <h1>Land Owner request Form</h1>
        </center>
        {sucess && <SucessMessage message={sucess} />}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Table borderless>
          <tr>
            <td>
              <h4>
                <center>
                  {"Welcome to the LandOwner request page "}
                  <br></br>
                  {"We are happay to have you as a partner"}
                  <br></br>
                  <br></br>
                  {"Our executives will contact to you for further assistance"}
                  <br></br>
                  <Button variant="primary" onClick={requestOwner}>
                    Request as owner
                  </Button>
                </center>
              </h4>
            </td>
          </tr>
        </Table>
        {/* <Table borderless>
          <tr>
            <td>Parking Space Licence Number : </td>
            <td colSpan={2}>
              <Form.Control
                type="text"
                placeholder="Licence Number"
                // value={rhrs}
                // onChange={(e) => setRhrs(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Parking Space Location : </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Latitude"
                // value={rhrs}
                // onChange={(e) => setRhrs(e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Longitude"
                // value={rhrs}
                // onChange={(e) => setRhrs(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Parking Space Address : </td>
            <td colSpan={2}>
              <Form.Control
                as="textarea"
                placeholder="Type Address here"
                style={{ height: "100px" }}
              />
            </td>
          </tr>
        </Table> */}
      </Container>
    </div>
  );
};

export default Lanwownerrequest;
