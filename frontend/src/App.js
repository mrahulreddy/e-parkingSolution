import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

import LandingPage from "./components/LandingPage";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Signup from "./components/signup";
import { ContactUs } from "./components/contactus";
import Validation from "./components/validation";
import Ewallet from "./components/ewallet";
import Aboutus from "./components/aboutus";
import Lanwownerrequest from "./components/lanwownerrequest";
import Faq from "./components/faq";
import Header from "./components/Header";

const App = () => (
  <BrowserRouter>
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup/validation" element={<Validation />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/landowner" element={<Lanwownerrequest />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/wallet" element={<Ewallet />} />
      </Routes>
    </main>

    <Footer />
  </BrowserRouter>

  // <>
  //
  // </>
);

export default App;
