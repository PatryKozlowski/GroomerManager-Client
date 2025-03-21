import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateNewSalonDialog from "@/components/dialogs/CreateNewSalonDialog";
import { useState } from "react";
function CreateNewSalon() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="w-full" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Dodaj salon
      </Button>
      <CreateNewSalonDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default CreateNewSalon;
