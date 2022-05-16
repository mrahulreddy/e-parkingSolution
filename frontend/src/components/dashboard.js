import React, { useEffect, useState } from "react";
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
  Card,
  Accordion,
} from "react-bootstrap";
import TimePicker from "./TimePicker";
import axios from "axios";

import AddPlaces from "./addPlaces";
import AddAdmin from "./addAdmin";
import BookPlace from "./bookPlace";
import Reports from "./reports";
import Header from "../components/Header";
const Dashboard = () => {
  const [isadmin, setIsadmin] = useState(false);
  const [isowner, setIsowner] = useState(false);
  const [isdriver, setIsdriver] = useState(true);
  const [pdata, setpdata] = useState([]);

  const get_place_data = async () => {
    const getplaces = await axios.get("/api/users/getplaces");
    setpdata(getplaces.data);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setIsadmin(JSON.parse(userInfo).isAdmin);
    setIsowner(JSON.parse(userInfo).isOwner);
    // setIsdriver(true);
    // console.log("+++++++++++++++++++", isadmin, isowner);
    if (!isadmin && !isowner) get_place_data();
  }, [isadmin, isowner]);

  function addplaces() { }
  
  // console.log('pdata', pdata)

  return (
    <div>
      <Header />
      <Container>
        <h1>
          <center>
            {isadmin && "Admin "}
            {isowner && "Landowner "}
            {!isadmin && !isowner && "Driver "}
            Dashboard
          </center>
        </h1>
      </Container>
      <Container>
        {(isadmin || isowner) && (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                <Card.Header> Add Places :</Card.Header>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AddPlaces />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}

        {(isadmin || (!isadmin && !isowner)) && (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                <Card.Header> Book Places :</Card.Header>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {pdata.length > 0 && (
                    <BookPlace pdata={pdata} get_place_data={get_place_data} />
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}

        {isadmin && (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                <Card.Header> Add Admin :</Card.Header>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AddAdmin />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}

        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
              <Card.Header> Reports :</Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Reports pdata={pdata} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    </div>
  );
};

export default Dashboard;
