import { ROUTES } from "@/lib/constants";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setIsCollapsed } from "@/redux/store/sidebar/sidebarSlice";

export const useSidebarActiveItem = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(
    ROUTES[location.pathname as keyof typeof ROUTES] || "Dashboard"
  );

  useEffect(() => {
    setActiveItem(
      ROUTES[location.pathname as keyof typeof ROUTES] || "Dashboard"
    );
  }, [location.pathname]);

  return activeItem;
};

export const useSidebarNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path: string) => {
    dispatch(setIsCollapsed(false));

    const params = new URLSearchParams(location.search);
    const salonId = params.get("salonId");

    if (salonId) {
      navigate(`${path}?salonId=${salonId}`);
    } else {
      navigate(path);
    }
  };

  return { handleItemClick };
};
