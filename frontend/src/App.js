import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} exact />
    </Routes>
  </BrowserRouter>
);

export default App;
