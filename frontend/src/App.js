import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import LandingPage from "./components/LandingPage";

const App = () => (
  <>
    <Header />
    <main>
      <LandingPage />
    </main>

    <Footer />
  </>

  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<LandingPage />} exact />
  //   </Routes>
  // </BrowserRouter>
);

export default App;
