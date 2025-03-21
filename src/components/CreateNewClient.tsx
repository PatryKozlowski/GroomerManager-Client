import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import CreateNewClientDialog from "@/components/dialogs/CreateNewClientDialog";
import { useDialog } from "@/hooks/useDialog";
function CreateNewClient() {
  const { isOpen, setIsOpen } = useDialog();
  return (
    <>
      <Button className="gap-2 md:w-auto" onClick={() => setIsOpen(true)}>
        <UserPlus className="h-4 w-4" />
        <span>Dodaj klienta</span>
      </Button>
      <CreateNewClientDialog open={isOpen} setOpen={setIsOpen} />
    </>
  );
}

export default CreateNewClient;
