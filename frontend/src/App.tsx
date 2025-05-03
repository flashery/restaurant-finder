import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import Dasboard from "./pages/Dashboard";
import AnimePage from "./pages/RestaurantsPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dasboard />} />
        <Route path="/anime/:id" element={<AnimePage />} />
      </Routes>
    </Router>
  );
}

export default App;
