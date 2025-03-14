import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/redux/store/theme/themeSlice";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

function ThemeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            className="h-10 w-10"
          >
            {theme === "light" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            )}
            <span className="sr-only">Zmień motyw</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zmień motyw na {theme === "light" ? "ciemny" : "jasny"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggle;
