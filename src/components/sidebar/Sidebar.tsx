import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useSidebarActiveItem, useSidebarNavigation } from "@/hooks/useSidebar";
import SidebarItemSkeleton from "./SidebarItemSkeleton";

function Sidebar() {
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);
  const { isLoading } = useSelector((state: RootState) => state.user);
  const activeItem = useSidebarActiveItem();
  const { handleItemClick } = useSidebarNavigation();

  return (
    <div className="relative">
      <aside
        className={cn(
          "fixed z-50 flex flex-col h-full transition-[width] duration-300 ease-in-out shadow-lg bg-background border-r lg:relative lg:z-auto",
          isCollapsed ? "w-full" : "w-0 lg:w-64"
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
                    active={activeItem === label}
                    onClick={() => handleItemClick(path)}
                  />
                ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
