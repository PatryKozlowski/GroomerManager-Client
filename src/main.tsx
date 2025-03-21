import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "@/redux/store/index.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import "./index.css";

const DashboardLayout = lazy(
  () => import("@/components/layouts/DashboardLayout")
);
const AuthLayout = lazy(() => import("@/components/layouts/AuthLayout"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ClientsPage = lazy(() => import("@/pages/ClientsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ConfirmEmailPage = lazy(() => import("@/pages/ConfirmEmailPage"));
const NotFoundPage = lazy(() => import("@/pages/NoFoundPage"));
const NoAccessPage = lazy(() => import("@/pages/NoAccessPage"));
const ClientPage = lazy(() => import("@/pages/ClientPage"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "clients/:id", element: <ClientPage /> },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "", element: <LoginPage /> }],
  },
  {
    path: "/register",
    element: <AuthLayout />,
    children: [{ path: "", element: <RegisterPage /> }],
  },
  {
    path: "/confirm-email",
    element: <AuthLayout />,
    children: [{ path: "", element: <ConfirmEmailPage /> }],
  },
  {
    path: "/no-access",
    element: <NoAccessPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
