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
import users_data from "../data/users";

const addAdmin = () => {
  return (
    <div>
      <Container>
        <h2> Add Admin :</h2>
        <Form.Label>List of users:</Form.Label>
        <select>
          {users_data.map((dat) => (
            <option> {dat.name} </option>
          ))}
          <hr />
        </select>
        <br />
        <Button variant="primary" type="submit">
          Add as admin
        </Button>
        &nbsp;&nbsp;
        <Button variant="primary" type="submit">
          Add as Land Owner
        </Button>
      </Container>
    </div>
  );
};

export default addAdmin;
