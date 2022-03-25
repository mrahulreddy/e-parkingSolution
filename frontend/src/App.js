import "./App.css";
import "./components/Login_transition";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/login";
import MyData from "./data/MyData";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mydata" element={<MyData />} />
    </Routes>
  </BrowserRouter>
);

export default App;
