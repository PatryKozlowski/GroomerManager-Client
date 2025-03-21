import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ControllerRenderProps, Path } from "react-hook-form";

interface NameInputProps<T extends Record<string, string>> {
  field: ControllerRenderProps<T, Path<T>>;
  inlineInputsShowError?: boolean;
  label?: string;
  placeholder?: string;
}

function NameInput<T extends Record<string, string>>({
  field,
  label,
  inlineInputsShowError = false,
  placeholder,
}: NameInputProps<T>) {
  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <div className="relative">
        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <FormControl>
          <Input placeholder={placeholder} className="pl-10" {...field} />
        </FormControl>
      </div>
      {inlineInputsShowError ? (
        <div className="min-h-4">
          <FormMessage />
        </div>
      ) : (
        <FormMessage />
      )}
    </FormItem>
  );
}

export default NameInput;
