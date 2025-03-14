import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "@/redux/store/index.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/NoFoundPage";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
