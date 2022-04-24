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

const AddAdmin = () => {
  const [udata, setUdata] = useState([]);
  const get_users_data = async () => {
    console.log("im get data");
    const { data } = await axios.get("/api/userdata");
    console.log(data);
    setUdata(data);
  };

  useEffect(() => {
    get_users_data();
  }, []);

  return (
    <div>
      <Container>
        <h2> Add Admin :</h2>
        <Form.Label>List of users:</Form.Label>
        <select>
          {udata.map((dat) => (
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

export default AddAdmin;
