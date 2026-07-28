import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import TestingPage from "./components/pages/TestingPage";
import HistoryPage from "./components/pages/HistoryPage";
import SignInPage from "./components/pages/SignInPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
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
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
