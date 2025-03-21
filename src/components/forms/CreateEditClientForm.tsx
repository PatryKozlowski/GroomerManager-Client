import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/loaders/Spinner";
import EmailInput from "@/components/inputs/EmailInput";
import NameInput from "@/components/inputs/NameInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEditClientSchema } from "@/schemas";
import { UserPlus, Edit } from "lucide-react";
import type { ClientFormData } from "@/types";
import PhoneInput from "@/components/inputs/PhoneInput";
interface CreateEditClientFormProps {
  onSave: () => void;
  isLoading: boolean;
  isEdit: boolean;
  client?: ClientFormData;
  callback: (data: ClientFormData) => Promise<void>;
}

function CreateEditClientForm({
  onSave,
  isLoading,
  isEdit,
  client,
  callback,
}: CreateEditClientFormProps) {
  const form = useForm<z.output<typeof CreateEditClientSchema>>({
    resolver: zodResolver(CreateEditClientSchema),
    values:
      isEdit && client
        ? {
            firstName: client.firstName,
            lastName: client.lastName,
            phone: client.phone,
            email: client.email || "",
          }
        : {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
          },
  });

  const onSubmit = async (data: ClientFormData) => {
    await callback(data);
    onSave();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <NameInput field={field} label="Imię klienta" placeholder="Jan" />
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <NameInput
              field={field}
              label="Nazwisko klienta"
              placeholder="Kowalski"
            />
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            // <FormItem>
            //   <FormLabel>Numer telefonu</FormLabel>
            //   <FormControl>
            //     <Input type="tel" placeholder="+48 732 332 734" {...field} />
            //   </FormControl>
            //   <FormMessage />
            // </FormItem>
            <PhoneInput field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <EmailInput field={field} />}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Spinner />}
          {isEdit ? (
            <>
              <Edit className="h-4 w-4" />
              Edytuj klienta
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Dodaj klienta
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
export default CreateEditClientForm;
