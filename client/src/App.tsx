import "./App.css";
import TestingPage from "./components/pages/TestingPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/testing" element={<TestingPage />} />
      </Routes>
    </div>
  );
}

export default App;
