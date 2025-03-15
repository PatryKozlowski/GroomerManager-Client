import { Navigate, Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Spinner from "@/components/loaders/Spinner";
import { useSidebarResize } from "@/hooks/useSidebarResize";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk } from "@/redux/store/user/userThunk";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchSalons } from "@/redux/store/salon/salonThunk";

function DashboardLayout() {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useSidebarResize();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserThunk());
      dispatch(fetchSalons());
    }
  }, [dispatch, isAuthenticated]);

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
            <div className="mx-auto max-w-7xl p-4 space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner />
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
