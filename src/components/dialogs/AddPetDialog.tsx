import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PawPrint } from "lucide-react";
import { AddPetSchema } from "@/schemas";

type AddPetFormData = typeof AddPetSchema._type;

interface AddPetDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  clientId: string;
}

function AddPetDialog({ open, setOpen, clientId }: AddPetDialogProps) {
  const form = useForm<AddPetFormData>({
    resolver: zodResolver(AddPetSchema),
    defaultValues: {
      name: "",
      breed: "",
      birthDate: "",
      weight: "",
    },
  });

  const onSubmit = async (data: AddPetFormData) => {
    // In a real application, this would make an API call
    console.log("Creating pet:", { ...data, clientId });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PawPrint className="h-5 w-5" />
            Dodaj nowego pupila
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię pupila</FormLabel>
                  <FormControl>
                    <Input placeholder="Imię pupila" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rasa</FormLabel>
                  <FormControl>
                    <Input placeholder="Rasa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data urodzenia</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waga (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <PawPrint className="h-4 w-4 mr-2" />
              Dodaj pupila
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPetDialog;
