import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface LoginInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  endContent?: React.ReactNode;
}

const LoginInput = React.forwardRef<HTMLInputElement, LoginInputProps>(
  ({ className, type, label, error, icon, endContent, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <div
          className={cn(
            "relative flex items-center rounded-lg border bg-muted/50 transition-all duration-300",
            isFocused
              ? "border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
              : "border-border hover:border-muted-foreground/30",
            error && "border-destructive/50"
          )}
        >
          {icon && (
            <span
              className={cn(
                "pl-4 transition-colors duration-300",
                isFocused ? "text-primary" : "text-muted-foreground"
              )}
            >
              {icon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "peer flex h-14 w-full bg-transparent px-4 pt-4 pb-2 text-foreground placeholder:text-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-3",
              endContent && "pr-12",
              className
            )}
            ref={ref}
            placeholder={label}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            {...props}
          />
          <motion.label
            className={cn(
              "pointer-events-none absolute left-4 transition-all duration-200",
              icon && "left-12",
              isFocused || hasValue || props.value
                ? "top-2 text-xs"
                : "top-1/2 -translate-y-1/2 text-sm",
              isFocused
                ? "text-primary"
                : error
                  ? "text-destructive"
                  : "text-muted-foreground"
            )}
          >
            {label}
          </motion.label>
          {endContent && (
            <span className="absolute right-4 text-muted-foreground">
              {endContent}
            </span>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-destructive"
            style={{ color: 'red' }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);
LoginInput.displayName = "LoginInput";

export { LoginInput };
