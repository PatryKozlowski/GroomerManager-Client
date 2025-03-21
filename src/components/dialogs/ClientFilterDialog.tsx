import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { filterClientSchema } from "@/schemas";
import type { FilterFormData } from "@/types";
import { useClientsFilterParams } from "@/hooks/useClientsFilterParams";

interface ClientFilterDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApplyFilters: (filters: FilterFormData) => void;
  hasActiveFilters: boolean;
  isLoading: boolean;
}

function ClientFilterDialog({
  open,
  setOpen,
  onApplyFilters,
  isLoading,
}: ClientFilterDialogProps) {
  const { filters } = useClientsFilterParams();

  const form = useForm<FilterFormData>({
    resolver: zodResolver(filterClientSchema),
    values: {
      hasPets: filters.hasPets,
      hasEmail: filters.hasEmail,
      lastVisitBefore: filters.lastVisitBefore,
      lastVisitAfter: filters.lastVisitAfter,
    },
  });

  const onSubmit = async (data: FilterFormData) => {
    await onApplyFilters(data);
    setOpen(false);
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtry klientów</DialogTitle>
          <DialogDescription>
            Ustaw filtry, aby znaleźć konkretnych klientów
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="hasPets"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label>Klienci ze zwierzętami</Label>
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="hasEmail"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label>Klienci z adresem email</Label>
              </div>

              <div className="space-y-2">
                <Label>Ostatnia wizyta</Label>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lastVisitAfter"
                    render={({ field }) => (
                      <Input type="date" placeholder="Od" {...field} />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastVisitBefore"
                    render={({ field }) => (
                      <Input type="date" placeholder="Do" {...field} />
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                Resetuj
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Filter className="h-4 w-4 mr-2" />
                Zastosuj filtry
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ClientFilterDialog;
