import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import TestingPage from "./components/pages/TestingPage";
import SignInPage from "./components/pages/SignInPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";
import HistoryPage from "./components/pages/HistoryPage";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/*" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
