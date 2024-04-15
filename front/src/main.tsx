import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import ProjectPage from "./pages/Projects/ProjectPage";
import { Provider } from "jotai";
import "./index.css";
import BoardPage from "./pages/Board/BoardPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
