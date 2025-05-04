import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dasboard from "./pages/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dasboard />} />
      </Routes>
    </Router>
  );
}

export default App;
