import { Navigate, Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Spinner from "@/components/loaders/Spinner";
import { useSidebarResize } from "@/hooks/useSidebarResize";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk } from "@/redux/store/user/userThunk";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/redux/store";

function DashboardLayout() {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useSidebarResize();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserThunk());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-7xl space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <Spinner />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
