import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetParams } from "@/hooks/useGetParams";
function NoAccessToClientDetails() {
  const navigate = useNavigate();
  const { salonId } = useGetParams();

  const handleNavigate = () => {
    navigate(`/dashboard/clients?salonId=${salonId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button onClick={handleNavigate}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Powrót
        </Button>
      </div>
      <div className="flex flex-col border justify-center p-8 rounded-lg text-center items-center">
        <AlertCircle className="h-12 text-destructive w-12 mb-3" />
        <h3 className="text-lg font-medium">Klient nie znaleziony</h3>
        <p className="text-muted-foreground text-sm mb-4 mt-1">
          Klient którego szukasz nie istnieje, bądź nie ma dostępu do niego
        </p>
        <Button className="gap-2" onClick={handleNavigate}>
          Powrót do klientów
        </Button>
      </div>
    </div>
  );
}

export default NoAccessToClientDetails;
