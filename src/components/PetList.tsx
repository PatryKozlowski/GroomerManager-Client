import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, PawPrint, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import AddPetDialog from "@/components/dialogs/AddPetDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockPets } from "@/mockData";

interface PetListProps {
  clientId: string;
}

function PetList({ clientId }: PetListProps) {
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const pets = mockPets.filter((pet) => pet.clientId === clientId);

  const handleDeletePet = async (petId: string) => {
    // In a real application, this would make an API call
    console.log("Deleting pet:", petId);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Pupile</CardTitle>
        <Button
          size="sm"
          onClick={() => setIsAddPetOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Dodaj pupila
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {!pets || pets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <PawPrint className="h-12 w-12 mb-4" />
              <p>Brak pupili</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pets.map((pet) => (
                <Card key={pet.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{pet.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pet.breed}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">
                          {new Date(pet.birthDate).toLocaleDateString()}
                        </Badge>
                        <Badge variant="secondary">{pet.weight} kg</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Usuń pupila</DialogTitle>
                            <DialogDescription>
                              Czy na pewno chcesz usunąć tego pupila? Tej
                              operacji nie można cofnąć.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Anuluj</Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeletePet(pet.id)}
                            >
                              Usuń
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {pet.notes.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Notatki:</h4>
                      <div className="space-y-2">
                        {pet.notes.map((note) => (
                          <div
                            key={note.id}
                            className="text-sm bg-muted p-2 rounded-md"
                          >
                            {note.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <AddPetDialog
        open={isAddPetOpen}
        setOpen={setIsAddPetOpen}
        clientId={clientId}
      />
    </Card>
  );
}

export default PetList;
