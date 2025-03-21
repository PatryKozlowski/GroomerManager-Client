import { Navigate, Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSidebarResize } from "@/hooks/useSidebarResize";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

function DashboardLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useSidebarResize();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full bg-background overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 h-full overflow-y-auto">
            {/* <div className="mx-auto max-w-7xl p-4 space-y-6"> */}
            <div className="mx-auto p-4 space-y-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
