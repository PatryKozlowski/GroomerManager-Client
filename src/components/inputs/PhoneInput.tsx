import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ControllerRenderProps, Path } from "react-hook-form";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps<T extends Record<string, string>> {
  field: ControllerRenderProps<T, Path<T>>;
  label?: string;
  placeholder?: string;
  inlineInputsShowError?: boolean;
}
function PhoneInput<T extends Record<string, string>>({
  field,
  label = "Telefon",
  placeholder = "+48 600 123 456",
  inlineInputsShowError = false,
}: PhoneInputProps<T>) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <FormControl>
          <Input placeholder={placeholder} className="pl-10" {...field} />
        </FormControl>
      </div>
      <FormControl></FormControl>
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

export default PhoneInput;
