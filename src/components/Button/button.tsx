import { cn } from "@/utils/utils";
import React from "react";

interface ButtonProps {
  variant?: "text" | "outline" | "primary";
  color?: string;
  size?: "s" | "m" | "l" | "xl";
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  content: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  color = "primary",
  size = "m",
  type = "button",
  icon,
  content,
  onClick,
  className,
}) => {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    text: "bg-transparent text-primary hover:underline",
  };

  const sizeClasses = {
    s: "px-2 py-1 text-sm",
    m: "px-4 py-2 text-base",
    l: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <button
      type={type}
      className={cn(
        `inline-flex items-center justify-center rounded-md transition-all duration-300 ease-in-out ${variantClasses[variant]} ${sizeClasses[size]} ${
          color && variant === "primary" ? `bg-${color}` : ""
        }`,
        className
      )}
      onClick={onClick}
    >
      <span>{content}</span>
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
