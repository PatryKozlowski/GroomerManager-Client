import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import CreateEditClientForm from "@/components/forms/CreateEditClientForm";
import type { ClientFormData } from "@/types";
import { useGetParams } from "@/hooks/useGetParams";
import { useGetClientQuery } from "@/redux/store/clients/clientsApiSlice";
interface EditClientDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function EditClientDialog({ open, setOpen }: EditClientDialogProps) {
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const { params, salonId } = useGetParams();
  const { data: client } = useGetClientQuery({
    salonId: salonId!,
    clientId: params.id!,
  });

  const handleEditClient = async (data: ClientFormData) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edytuj klienta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edytuj klienta</DialogTitle>
          <DialogDescription>
            Aktualizuj informacje o kliencie
          </DialogDescription>
        </DialogHeader>
        <CreateEditClientForm
          onSave={handleCloseDialog}
          isLoading={false}
          isEdit={true}
          client={client}
          callback={handleEditClient}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditClientDialog;
