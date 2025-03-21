import { Mail } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ControllerRenderProps, Path } from "react-hook-form";

interface EmailInputProps<T extends Record<string, string>> {
  field: ControllerRenderProps<T, Path<T>>;
  label?: string;
  placeholder?: string;
  inlineInputsShowError?: boolean;
}

function EmailInput<T extends Record<string, string>>({
  field,
  label = "Email",
  placeholder = "konto@groomermanager.pl",
  inlineInputsShowError = false,
}: EmailInputProps<T>) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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

export default EmailInput;
