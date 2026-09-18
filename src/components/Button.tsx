import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary: "bg-ocean text-cream hover:bg-ocean-dark",
  secondary: "bg-djerba text-cream hover:bg-djerba-dark",
  outline: "border border-ocean/30 text-ocean hover:border-ocean hover:bg-ocean/5",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors duration-300 ease-smooth disabled:cursor-not-allowed disabled:opacity-50";

export default function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = baseClasses + " " + variantClasses[variant] + " " + className;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, children: _c, className: _cn, ...buttonProps } = props as ButtonAsButton;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}