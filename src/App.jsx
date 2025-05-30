import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterGuard from "./pages/RegisterGuard";
import { AuthProvider } from "./context/Auth/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterGuard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
