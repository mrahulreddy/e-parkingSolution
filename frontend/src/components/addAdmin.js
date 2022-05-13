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
import SucessMessage from "./SucessMessage";

const AddAdmin = () => {
  const [udata, setUdata] = useState([]);
  const [suser, setSuser] = useState([]);
  const [sucess, setSucess] = useState(false);
  const get_users_data = async () => {
    const { data } = await axios.get("/api/users/getusers");
    setUdata(data);
  };

  const addAsAdmin = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      var email = suser;

      const { data } = await axios.put(
        "/api/users/addadmin",
        {
          email,
        },
        config
      );
      setSucess("Sucessfully Added as Admin");
    } catch (error) {}
  };

  const addAsOwner = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      var email = suser;

      const { data } = await axios.put(
        "/api/users/addowner",
        {
          email,
        },
        config
      );
      setSucess("Sucessfully Added as Owner");
    } catch (error) {}
  };

  useEffect(() => {
    setSucess(false);
    get_users_data();

    document
      .getElementById("user-options")
      .addEventListener("change", function () {
        setSuser(this.value);
      });
  }, []);

  return (
    <div>
      <Container>
        <h2> Add Admin :</h2>
        {sucess && <SucessMessage message={sucess} />}
        <Form.Label>List of users:</Form.Label>
        <select id="user-options">
          {udata.map((dat) => (
            <option> {dat.email} </option>
          ))}
        </select>
        <br />
        <Button variant="primary" onClick={addAsAdmin}>
          Add as admin
        </Button>
        &nbsp;&nbsp;
        <Button variant="primary" onClick={addAsOwner}>
          Add as Land Owner
        </Button>
      </Container>
    </div>
  );
};

export default AddAdmin;
