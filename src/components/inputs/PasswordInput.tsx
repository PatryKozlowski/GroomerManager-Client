import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye, Lock } from "lucide-react";
import { ControllerRenderProps, Path } from "react-hook-form";
import { useState } from "react";
function PasswordInput<T extends Record<string, string>>({
  field,
}: {
  field: ControllerRenderProps<T, Path<T>>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
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
  );
}

export default PasswordInput;
