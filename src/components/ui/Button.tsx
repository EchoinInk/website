import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type BaseButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
  };

type RouterLinkButtonProps = BaseButtonProps &
  Omit<LinkProps, "to" | "children" | "className"> & {
    to: string;
    disabled?: boolean;
  };

type ButtonProps = NativeButtonProps | RouterLinkButtonProps;

export function Button({
  children,
  to,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    relative isolate
    inline-flex items-center justify-center
    font-structural uppercase
    touch-manipulation
    transition-all duration-500 ease-out
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[var(--ei-theme-focus)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[var(--ei-color-background-canvas)]
    disabled:pointer-events-none
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const variants: Record<ButtonVariant, string> = {
    primary: `
      ei-btn-primary-cinematic
      group
      min-h-[48px]
      min-w-[200px]
      rounded-full
      px-11 py-[18px]
      text-[10px]
      font-medium
      tracking-[0.18em]
      text-[var(--ei-button-text-primary)]
      hover:-translate-y-[2px]
      hover:text-[var(--ei-button-text-primary-hover)]
      active:translate-y-0
    `,

    secondary: `
      group
      min-h-[44px]
      rounded-full
      border border-[var(--ei-button-secondary-border)]
      bg-[var(--ei-button-secondary-bg)]
      px-6 py-3.5
      text-[10px]
      font-medium
      tracking-[0.18em]
      text-[var(--ei-button-text-secondary)]
      shadow-[var(--ei-card-shadow)]
      hover:-translate-y-[1px]
      hover:border-[var(--ei-button-secondary-border-hover)]
      hover:bg-[var(--ei-button-secondary-bg-hover)]
      hover:text-[var(--ei-button-text-secondary-hover)]
      active:translate-y-0
    `,

    tertiary: `
      group
      rounded-none
      bg-transparent
      px-0 py-1
      text-[10px]
      font-medium
      tracking-[0.14em]
      text-[var(--ei-button-text-tertiary)]
      hover:text-[var(--ei-button-text-tertiary-hover)]
    `,
  };

  const buttonClassName = `${baseClasses} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>

      {variant === "tertiary" && (
        <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--ei-button-text-tertiary-hover)]/40 transition-all duration-500 ease-out group-hover:w-full" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={`${buttonClassName} ${
          disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""
        }`}
        {...(props as Omit<LinkProps, "to" | "children" | "className">)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
      disabled={disabled}
      className={buttonClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
