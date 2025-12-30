import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  value: number | string;
  unit: string;
  label: string;
  className?: string;
}

export function StatsCard({
  icon: Icon,
  value,
  unit,
  label,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-4 shadow-sm border border-border",
        className
      )}
    >
      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-card-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
