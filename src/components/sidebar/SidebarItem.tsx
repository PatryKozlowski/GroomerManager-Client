import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setIsCollapsed } from "@/redux/store/sidebar/sidebarSlice";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  end?: boolean;
}

function SidebarItem({ icon, label, to, end }: SidebarItemProps) {
  const dispatch = useDispatch();
  const location = useLocation();

  const getTo = () => {
    const params = new URLSearchParams(location.search);
    const salonId = params.get("salonId");

    if (salonId) {
      return `${to}?salonId=${salonId}`;
    }

    return to;
  };

  const handleClick = () => {
    dispatch(setIsCollapsed(false));
  };

  return (
    <NavLink
      to={getTo()}
      end={end}
      onClick={handleClick}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "flex items-center w-full p-3 my-1 text-sm transition-all duration-200 rounded-lg",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )
      }
    >
      <div className="flex items-center justify-center w-5 h-5 mr-3">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

export default SidebarItem;
