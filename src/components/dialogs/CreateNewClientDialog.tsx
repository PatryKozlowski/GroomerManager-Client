import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateEditClientForm from "@/components/forms/CreateEditClientForm";
import { useSalonSelector } from "@/hooks/useSalonSelector";
import { useCreateClientMutation } from "@/redux/store/clients/clientsApiSlice";
import { useGetParams } from "@/hooks/useGetParams";
import type { ClientFormData } from "@/types";

interface CreateNewClientDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateNewClientDialog({ open, setOpen }: CreateNewClientDialogProps) {
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [createClient, { isLoading }] = useCreateClientMutation();
  const { salonId } = useGetParams();
  const { currentSalon } = useSalonSelector();

  const handleCreateClient = async (data: ClientFormData) => {
    await createClient({
      ...data,
      salonId: salonId || currentSalon?.id || "",
    }).unwrap();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stwórz nowego klienta</DialogTitle>
          <DialogDescription>
            Wprowadź dane nowego klienta i dodaj go do swojego salonu.
          </DialogDescription>
        </DialogHeader>
        <CreateEditClientForm
          onSave={handleCloseDialog}
          isLoading={isLoading}
          isEdit={false}
          callback={handleCreateClient}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewClientDialog;
