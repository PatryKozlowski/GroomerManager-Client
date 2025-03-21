import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import SidebarItem from "@/components/sidebar/SidebarItem";
import SidebarItemSkeleton from "./SidebarItemSkeleton";
import { useGetUserQuery } from "@/redux/store/user/userApiSlice";

function Sidebar() {
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);
  const { isLoading } = useGetUserQuery();

  return (
    <div className="relative">
      <aside
        className={cn(
          "fixed z-50 flex flex-col h-full transition-[width] duration-300 ease-in-out shadow-lg bg-background border-r lg:relative lg:z-auto",
          isCollapsed ? "w-full border-0" : "w-0 lg:w-64 border-r"
        )}
      >
        <div className="flex-1 overflow-y-auto lg:p-2">
          <nav className="py-1">
            {isLoading
              ? NAV_ITEMS.map((_, index) => <SidebarItemSkeleton key={index} />)
              : NAV_ITEMS.map(({ path, label, icon }) => (
                  <SidebarItem
                    key={path}
                    icon={icon}
                    label={label}
                    to={path}
                    end={path === "/dashboard"}
                  />
                ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
