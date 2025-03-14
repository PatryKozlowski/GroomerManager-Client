import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSidebarResize } from "@/hooks/useSidebarResize";

function DashboardLayout() {
  useSidebarResize();
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
