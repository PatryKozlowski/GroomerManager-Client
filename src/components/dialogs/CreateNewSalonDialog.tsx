import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateNewSalonForm from "@/components/forms/CreateNewSalonForm";

function CreateNewSalonDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stwórz nowy salon</DialogTitle>
          <DialogDescription>
            Wprowadź nazwę nowego salonu i stwórz nowy salon.
          </DialogDescription>
        </DialogHeader>
        <CreateNewSalonForm onSave={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
export default CreateNewSalonDialog;
