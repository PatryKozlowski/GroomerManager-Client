import { Users } from "lucide-react";
import CreateNewClient from "@/components/CreateNewClient";

export default function NotFoundClient() {
  return (
    <div className="flex flex-col border justify-center p-8 rounded-lg text-center items-center min-h-[400px]">
      <div className="bg-muted p-6 rounded-full">
        <Users className="h-12 text-muted-foreground w-12" />
      </div>
      <h3 className="text-xl font-semibold mt-6">Nie znaleziono klientów</h3>
      <p className="text-center text-muted-foreground text-sm max-w-md mt-3">
        Nie znaleziono żadnych klientów spełniających podane kryteria
        wyszukiwania.
      </p>
      <div className="mt-8">
        <CreateNewClient />
      </div>
    </div>
  );
}
