import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
};

export default function Chip({ children }: ChipProps) {
  return <span className="chip">{children}</span>;
}
