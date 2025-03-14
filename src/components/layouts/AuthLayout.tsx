import { Outlet } from "react-router";
import ThemeToggle from "@/components/ThemeToggle";

function AuthLayout() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="relative top-4 right-4 flex justify-end">
        <ThemeToggle />
      </div>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{<Outlet />}</main>
      </div>
    </div>
  );
}

export default AuthLayout;
