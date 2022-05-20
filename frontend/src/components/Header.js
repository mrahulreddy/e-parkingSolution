import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
const clearuserInfo = () => {
  localStorage.removeItem("userInfo");
};
// console.log("HHHHHHHHHHHHHHHHHHHHHHH");

const Header = () => {
  const [logout, setLogOut] = useState(localStorage.getItem("userInfo"));

  const showlogout = async () => {
    await setLogOut(localStorage.getItem("userInfo"));
  };

  useEffect(() => {
    setLogOut(localStorage.getItem("userInfo"));
    showlogout();
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">Parking Solution</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/aboutus">About Us</Link>
            </Nav.Link>
            {logout && (
              <Nav.Link>
                <Link to="/dashboard">Dashboard</Link>
              </Nav.Link>
            )}
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to="/faq">User FAQ's</Link>
              </NavDropdown.Item>
              {logout && (
                <NavDropdown.Item>
                  <Link to="/wallet">Add Money</Link>
                </NavDropdown.Item>
              )}
              {logout && (
                <NavDropdown.Item>
                  <Link to="/landowner">Enroll as LandOwner</Link>
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/contactus">Contact us</Link>
              </NavDropdown.Item>
            </NavDropdown>
            {logout && (
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  setLogOut(localStorage.getItem("userInfo"));
                }}
              >
                <Link to="/">Logout </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
