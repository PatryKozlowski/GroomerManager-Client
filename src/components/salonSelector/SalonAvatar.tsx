import { Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Salon } from "@/types";

function SalonAvatar({ salon }: { salon: Salon }) {
  if (!salon.logoPath) {
    return <Home className="h-4 w-4" />;
  }

  return (
    <Avatar className="h-6 w-6">
      <AvatarImage src={salon.logoPath} alt={salon.name} />
      <AvatarFallback>
        <Home className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}

export default SalonAvatar;
