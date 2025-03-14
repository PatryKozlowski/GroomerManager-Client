import { Mail } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ControllerRenderProps, Path } from "react-hook-form";

function EmailInput<T extends Record<string, string>>({
  field,
}: {
  field: ControllerRenderProps<T, Path<T>>;
}) {
  return (
    <div className="relative">
      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <FormControl>
        <Input
          placeholder="konto@groomermanager.pl"
          className="pl-10"
          {...field}
        />
      </FormControl>
    </div>
  );
}

export default EmailInput;
