import React from "react";
import "./dashboard.css";
import { Col, Form, Row, Container, Dropdown } from "react-bootstrap";

const dashboard = () => {
  return (
    <>
      <div className="dashboardContainer" id="dashboardContainer">
        <Form>
          <div className="dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Parking Place 1
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/Place-1">Place-1</Dropdown.Item>
                <Dropdown.Item href="#/Place-2">Place-2 </Dropdown.Item>
                <Dropdown.Item href="#/Place-3">Place-3 </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Form>
      </div>
    </>
  );
};

export default dashboard;
