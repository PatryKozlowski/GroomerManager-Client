import SalonSelectorSkeleton from "@/components/salonSelector/SalonSelectorSkeleton";
import DropdownSalonSelector from "@/components/salonSelector/DropdownSalonSelector";
import StaticSalonDisplay from "@/components/salonSelector/StaticSalonDisplay";
import { useSalonSelector } from "@/hooks/useSalonSelector";

function SalonSelector() {
  const {
    salons,
    currentSalon,
    isLoading,
    showSalonSelectorForOwner,
    showSalonSelectorForUser,
    changeSalon,
  } = useSalonSelector();

  if (isLoading) {
    return <SalonSelectorSkeleton />;
  }

  if (!currentSalon) {
    return null;
  }

  return (
    <div className="mr-3">
      {showSalonSelectorForOwner && !showSalonSelectorForUser ? (
        <DropdownSalonSelector
          currentSalon={currentSalon}
          salons={salons}
          onSalonChange={changeSalon}
        />
      ) : (
        <StaticSalonDisplay currentSalon={currentSalon} />
      )}
    </div>
  );
}

export default SalonSelector;
