import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-djerba text-cream hover:bg-djerba-dark",
  secondary:
    "bg-sun text-ink hover:bg-terracotta hover:text-cream",
  outline:
    "border border-djerba/30 text-djerba hover:border-djerba hover:bg-djerba/5",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors duration-300 ease-smooth disabled:cursor-not-allowed disabled:opacity-50";

export default function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, children: _c, className: _cn, ...buttonProps } =
    props as ButtonAsButton;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}