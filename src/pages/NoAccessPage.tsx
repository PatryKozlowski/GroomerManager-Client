import { useNavigate, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useSalonSelector } from "@/hooks/useSalonSelector";
import AuthLayoutHeader from "@/components/layouts/AuthLayoutHeader";
import DropdownSalonSelector from "@/components/salonSelector/DropdownSalonSelector";
import StaticSalonDisplay from "@/components/salonSelector/StaticSalonDisplay";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { clearAccessError } from "@/redux/store/auth/authSlice";

function NoAccessPage() {
  const navigate = useNavigate();
  const { salons, currentSalon, changeSalon } = useSalonSelector();
  const { isAuthenticated, isAccessError } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSalonChange = (salonId: string) => {
    changeSalon(salonId);
    dispatch(clearAccessError());
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAccessError) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col h-screen justify-center p-4 text-center w-full gap-6 items-center">
      <AuthLayoutHeader
        title="Brak dostępu"
        description="Nie masz dostępu do tego salonu"
      />
      <div className="max-w-md space-y-2">
        <p className="text-muted-foreground">
          Nie posiadasz uprawnień do tego salonu. Możesz przełączyć się na inny
          salon, do którego masz dostęp.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="default"
          onClick={() => navigate("/dashboard")}
          className="min-w-32"
        >
          Wróć do dashboardu
        </Button>
        {salons && currentSalon && salons.length > 1 && (
          <DropdownSalonSelector
            currentSalon={currentSalon}
            salons={salons}
            onSalonChange={handleSalonChange}
          />
        )}
        {salons && currentSalon && salons.length === 1 && (
          <StaticSalonDisplay currentSalon={currentSalon!} />
        )}
      </div>
    </div>
  );
}

export default NoAccessPage;
