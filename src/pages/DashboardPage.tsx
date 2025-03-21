import DashboardHeader from "@/components/DashboardHeader";
import { useSalonSelector } from "@/hooks/useSalonSelector";
import { useDashboardGreeting } from "@/hooks/useDashboardGreeting";
function DashboardPage() {
  const { currentSalon } = useSalonSelector();
  const greeting = useDashboardGreeting();
  return (
    <div>
      <DashboardHeader
        title={greeting}
        description={`To się zmienia w ${
          currentSalon?.name === undefined
            ? "Twoim salonie"
            : currentSalon?.name
        }`}
      />
    </div>
  );
}

export default DashboardPage;
