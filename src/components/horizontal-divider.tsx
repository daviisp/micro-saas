import { cn } from "@/lib/utils";

type HorizontalDividerProps = {
  className: string;
};

export function HorizontalDivider({ className }: HorizontalDividerProps) {
  return <div className={cn("", className)} />;
}
