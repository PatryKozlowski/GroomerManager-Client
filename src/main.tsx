import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "@/redux/store/index.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import AuthLayout from "@/components/layouts/AuthLayout";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
