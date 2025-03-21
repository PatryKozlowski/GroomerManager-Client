import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye, Lock } from "lucide-react";
import { ControllerRenderProps, Path } from "react-hook-form";
import { useState } from "react";

interface PasswordInputProps<T extends Record<string, string>> {
  field: ControllerRenderProps<T, Path<T>>;
  label?: string;
  placeholder?: string;
  inlineInputsShowError?: boolean;
}

function PasswordInput<T extends Record<string, string>>({
  field,
  label = "Hasło",
  placeholder = "••••••••",
  inlineInputsShowError = false,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <FormControl>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className="px-10"
            {...field}
          />
        </FormControl>
        {showPassword ? (
          <Eye
            className="absolute right-3 top-3 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-300"
            onClick={toggleShowPassword}
          />
        ) : (
          <EyeOff
            className="absolute right-3 top-3 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-300"
            onClick={toggleShowPassword}
          />
        )}
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

export default PasswordInput;
