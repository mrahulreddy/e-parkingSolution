import "./App.css";
import "./components/Login_transition";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/login";
// import MyData from "./data/MyData";
import DashBoard from "./components/dashboard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} exact />
      <Route path="/dashboard" element={<DashBoard />} exact />
    </Routes>
  </BrowserRouter>
);

export default App;
