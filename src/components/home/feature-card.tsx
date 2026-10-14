import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center max-w-52 justify-center gap-2">
      <Icon className="size-5 text-secondary-white" />

      <h2 className="text-sm font-semibold text-secondary-white">{title}</h2>

      <p className="text-center text-xs text-zinc-400">{description}</p>
    </div>
  );
}
