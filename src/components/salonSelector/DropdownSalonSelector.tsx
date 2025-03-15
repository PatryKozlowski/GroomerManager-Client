import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import SalonAvatar from "@/components/salonSelector/SalonAvatar";
import type { Salon } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

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
  const { user } = useSelector((state: RootState) => state.user);
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
      <DropdownMenuContent align="end" className="w-[200px]">
        {salons.map((salon) => (
          <DropdownMenuItem
            key={salon.id}
            className={salon.id === currentSalon.id ? "bg-primary/10" : ""}
            onClick={() => onSalonChange(salon.id)}
          >
            <div className="flex items-center gap-2 truncate">
              <SalonAvatar salon={salon} />
              <span className="truncate">{salon.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
        {user?.role === "Owner" && (
          <Button className="w-full mt-2">
            <Plus className="h-4 w-4" />
            Dodaj salon
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownSalonSelector;
