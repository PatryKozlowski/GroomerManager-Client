import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/loaders/Spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNewSalonSchema } from "@/schemas";
import { useCreateSalonMutation } from "@/redux/store/salon/salonApiSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
function CreateNewSalonForm({ onSave }: { onSave: () => void }) {
  const form = useForm<z.output<typeof CreateNewSalonSchema>>({
    resolver: zodResolver(CreateNewSalonSchema),
    defaultValues: {
      name: "",
    },
  });

  const [createSalon, { isLoading, isSuccess }] = useCreateSalonMutation();

  const onSubmit = async (values: z.output<typeof CreateNewSalonSchema>) => {
    await createSalon(values).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Salon został utworzony");
      onSave();
    }
  }, [isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Super nazwa !" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Spinner />}
          <Plus className="h-4 w-4" />
          Dodaj salon
        </Button>
      </form>
    </Form>
  );
}

export default CreateNewSalonForm;
