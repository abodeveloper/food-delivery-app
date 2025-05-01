import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
}: FormFieldProps) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={isPasswordField && showPassword ? "text" : type}
                placeholder={placeholder}
                {...field}
                className={
                  error
                    ? "border-destructive pr-10"
                    : isPasswordField
                    ? "pr-10"
                    : ""
                }
              />
              {isPasswordField && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
