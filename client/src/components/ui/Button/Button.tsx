import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";
import SVG from "react-inlinesvg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text" | "danger" | "special";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: string;
  endIcon?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  className = "",
  ...props
}) => {
  const buttonClasses = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? "button--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {startIcon && (
        <span className="button__icon button__icon--start">
          <SVG src={startIcon} />
        </span>
      )}
      <span className="button__text">{children}</span>
      {endIcon && (
        <span className="button__icon button__icon--end">
          <SVG src={endIcon} />
        </span>
      )}
    </button>
  );
};

export default Button;
