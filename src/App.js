import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar";
import Home from "./component/home";
import Report from "./component/report";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/api/" element={<Home />} />
          <Route exact path="/report" element={<Report />} />

          
        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
