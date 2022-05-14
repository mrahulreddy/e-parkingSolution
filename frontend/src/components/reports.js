import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const Reports = () => {
  const [isadmin, setIsadmin] = useState(false);
  const [isowner, setIsowner] = useState(false);
  const [isdriver, setIsdriver] = useState(true);
  const [udata, setUdata] = useState([]);
  const [suser, setSuser] = useState([]);
  var cnt = 1;
  const get_users_data = async () => {
    const { data } = await axios.get("/api/users/getusers");
    setUdata(data);
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

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setIsadmin(JSON.parse(userInfo).isAdmin);
    setIsowner(JSON.parse(userInfo).isOwner);
    setIsdriver(true);
    get_users_data();
  }, []);

  return (
    <div>
      <Container>
        <h5>
          <u>
            <center>{isadmin && "User Data "}</center>
          </u>
        </h5>
        {isadmin && (
          <Table striped bordered hover size="sm">
            <thead>
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
              {udata.map((dat) => (
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
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default Reports;
