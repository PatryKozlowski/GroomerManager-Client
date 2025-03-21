import { Outlet, Navigate } from "react-router";
import ThemeToggle from "@/components/ThemeToggle";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

function AuthLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && window.location.pathname === "/login") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="w-full p-2 flex justify-end">
        <ThemeToggle />
      </header>
      <div className="flex flex-1 w-full bg-background overflow-hidden">
        <main className="flex-1 overflow-y-auto">{<Outlet />}</main>
      </div>
    </div>
  );
}

export default AuthLayout;
