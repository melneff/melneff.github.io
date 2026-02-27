import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  const safeHref = href ?? "#";
  const cls = variant === "primary" ? "btn btn-primary" : "btn btn-secondary";

  return (
    <a className={cls} href={safeHref} target={safeHref.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  );
}
