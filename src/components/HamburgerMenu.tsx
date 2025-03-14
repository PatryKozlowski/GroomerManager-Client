import { setIsCollapsed } from "@/redux/store/sidebar/sidebarSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

function HamburgerMenu() {
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => dispatch(setIsCollapsed(!isCollapsed))}
            size="icon"
            className={cn("bg-primary lg:hidden")}
          >
            {isCollapsed ? (
              <>
                <X className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Zwiń menu</span>
              </>
            ) : (
              <>
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Otwórz menu</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isCollapsed ? "Zwiń menu" : "Otwórz menu"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default HamburgerMenu;
