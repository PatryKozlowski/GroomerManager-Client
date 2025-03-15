import SalonAvatar from "@/components/salonSelector/SalonAvatar";
import type { Salon } from "@/types";

interface StaticSalonDisplayProps {
  currentSalon: Salon;
}

function StaticSalonDisplay({ currentSalon }: StaticSalonDisplayProps) {
  return (
    <div className="max-h-[36px] p-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm border bg-background shadow-xs dark:bg-input/30 dark:border-input">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 truncate">
          <SalonAvatar salon={currentSalon} />
          <span className="truncate">{currentSalon.name}</span>
        </div>
      </div>
    </div>
  );
}

export default StaticSalonDisplay;
