import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import ProjectPage from "./pages/Projects/ProjectPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
