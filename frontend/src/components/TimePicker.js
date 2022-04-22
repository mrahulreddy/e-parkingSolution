import React from "react";
import { Form } from "react-bootstrap";

const TimePicker = () => {
  return (
    <div>
      <select name="places" id="places">
        <option value="0">00:00 </option>
        <option value="1">00:01 </option>
        <option value="2">00:02 </option>
        <option value="3"> 00:03 </option>
        <option value="4">00:04 </option>
        <option value="5"> 00:05 </option>
        <option value="6">00:06 </option>
        <option value="7">00:07 </option>
        <option value="8"> 00:08 </option>
      </select>
    </div>
  );
};

export default TimePicker;
