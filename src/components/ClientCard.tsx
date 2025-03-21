import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { Client } from "@/types";
import { useNavigate } from "react-router";
import { useSalonSelector } from "@/hooks/useSalonSelector";
import { getInitials, formatPhoneNumber } from "@/lib/utils";

interface ClientCardProps {
  client: Client;
}

function ClientCard({ client }: ClientCardProps) {
  const { currentSalon } = useSalonSelector();

  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/clients/${id}?salonId=${currentSalon?.id}`);
  };

  const pets = [
    {
      id: "1",
      name: "Mia",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Max",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Buddy",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      name: "Bella",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "5",
      name: "Charlie",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Card className="w-[274px] hover:shadow-md overflow-hidden transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(client.firstName + " " + client.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-base font-medium leading-none truncate">
              {client.firstName} {client.lastName}
            </h3>
            <p className="text-sm truncate">
              {formatPhoneNumber(client.phone)}
            </p>
            <p className="text-muted-foreground text-sm truncate">
              {client.email || "Brak emaila"}
            </p>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Pupile</span>
            <span className="text-muted-foreground text-xs">
              {pets.length} pupili
            </span>
          </div>

          {pets.length > 0 ? (
            <div className="flex -space-x-2 overflow-hidden">
              {pets.map((pet) => (
                <Avatar
                  key={pet.id}
                  className="border-2 border-background h-8 w-8"
                >
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {pet.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {pets.length > 4 && (
                <div className="flex bg-secondary border-2 border-background h-8 justify-center rounded-full text-xs w-8 font-medium items-center">
                  +{pets.length - 4}
                </div>
              )}
            </div>
          ) : (
            <Badge variant="outline" className="bg-secondary/50 text-xs">
              Brak zwierząt
            </Badge>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewDetails(client.id)}
            className="gap-1"
          >
            <Eye className="h-4 w-4" />
            Szczegóły
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ClientCard;
