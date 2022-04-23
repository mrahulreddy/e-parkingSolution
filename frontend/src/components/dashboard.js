import React from "react";
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
} from "react-bootstrap";
import TimePicker from "./TimePicker";
import users_data from "../data/users";
import AddPlaces from "./addPlaces";
import AddAdmin from "./addAdmin";
import BookPlace from "./bookPlace";

const dashboard = () => {
  return (
    <div>
      <Container>
        <h1>
          <center>Admin Dashboard</center>
        </h1>
      </Container>
      <AddPlaces />
      <BookPlace />
      <AddAdmin />
    </div>
  );
};

export default dashboard;
