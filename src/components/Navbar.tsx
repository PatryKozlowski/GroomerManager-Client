import { cn } from "@/lib/utils";
import { setIsCollapsed } from "@/redux/store/sidebar/sidebarSlice";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";
import ThemeToggle from "@/components/ThemeToggle";
import type { RootState } from "@/redux/store";

function Navbar() {
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-10 border-b bg-background w-full p-4 h-[65px]">
      <div className="flex gap-2 justify-between">
        <div className="flex items-start">
          <HamburgerMenu />
          <Button
            size={"icon"}
            onClick={() => dispatch(setIsCollapsed(!isCollapsed))}
            className={cn("lg:hidden p-1 rounded-md", !isCollapsed && "hidden")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-row gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
