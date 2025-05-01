import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodObject, ZodRawShape } from "zod";

export function useFormValidation<T extends ZodRawShape>(
  schema: ZodObject<T>
): UseFormReturn<z.infer<ZodObject<T>>> {
  return useForm<z.infer<ZodObject<T>>>({
    resolver: zodResolver(schema),
  });
}
