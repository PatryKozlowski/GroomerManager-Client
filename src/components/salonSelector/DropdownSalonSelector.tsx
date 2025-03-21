import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateNewSalon from "@/components/CreateNewSalon";
import SalonAvatar from "@/components/salonSelector/SalonAvatar";
import { ChevronDown } from "lucide-react";
import type { Salon } from "@/types";
import { useGetUserQuery } from "@/redux/store/user/userApiSlice";
import { cn } from "@/lib/utils";

interface DropdownSalonSelectorProps {
  currentSalon: Salon;
  salons: Salon[];
  onSalonChange: (id: string) => void;
}

function DropdownSalonSelector({
  currentSalon,
  salons,
  onSalonChange,
}: DropdownSalonSelectorProps) {
  const { data: user } = useGetUserQuery();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between items-center gap-2"
        >
          <div className="flex items-center gap-2 truncate">
            <SalonAvatar salon={currentSalon} />
            <span className="truncate">{currentSalon.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] gap-2 flex flex-col"
      >
        {salons.map((salon) => (
          <DropdownMenuItem
            key={salon.id}
            className={cn(
              "cursor-pointer hover:bg-primary/10 transition-colors duration-300",
              salon.id === currentSalon.id ? "bg-primary/10" : ""
            )}
            onClick={() => onSalonChange(salon.id)}
          >
            <div className="flex items-center gap-2 truncate">
              <SalonAvatar salon={salon} />
              <span className="truncate">{salon.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
        {user?.role === "Owner" &&
          window.location.pathname !== "/no-access" && <CreateNewSalon />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownSalonSelector;
