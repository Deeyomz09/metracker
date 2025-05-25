import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <div className="flex min-h-screen">
      <Router>
        <Navbar />
        <Dashboard />
        <Routes>
          <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
