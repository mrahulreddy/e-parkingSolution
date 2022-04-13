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
} from "react-bootstrap";

const dashboard = () => {
  return (
    <>
      <div className="container">
        <label for="cars">Choose Place:</label>

        <select name="places" id="places">
          <option value="Abbey Wood">Abbey Wood		</option>
          <option value="Acton">Acton			</option>
          <option value="Acton Green">Acton Green		</option>
          <option value="Addington">Addington		</option>
		  <option value="Addiscombe">Addiscombe		</option>
		  <option value="Aldborough Hatch ">Aldborough Hatch </option>
		  <option value="Aldersbrook">Aldersbrook		</option>
		  <option value="Alperton">Alperton	        </option>
		  <option value="Anerley">Anerley			</option>
		  
		  
        </select>
      </div>
    </>
  );
};

export default dashboard;
