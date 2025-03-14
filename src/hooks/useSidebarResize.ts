import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsCollapsed } from "@/redux/store/sidebar/sidebarSlice";

export function useSidebarResize() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setIsCollapsed(false));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
}
