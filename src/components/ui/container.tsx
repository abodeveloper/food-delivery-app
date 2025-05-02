// components/ui/container.tsx
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("w-full max-w-screen-xl mx-auto px-4 md:px-6", className)}
      {...props}
    />
  );
}
