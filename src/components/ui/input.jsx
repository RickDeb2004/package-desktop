// src/components/ui/input.jsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, variant = "default", ...props }, ref) => {
    const inputStyles = {
      default: "border-gray-200 placeholder:text-black",
      error: "border-red-500 placeholder:text-red-500",
    };
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-800 dark:focus-visible:ring-gray-300",
          inputStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
