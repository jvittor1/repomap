import type { LucideIcon } from "lucide-react";

type RepositoryStatProps = {
  icon: LucideIcon;
  text: string | number;
  name: string;
};

export function RepositoryStat({
  icon: Icon,
  text,
  name,
}: RepositoryStatProps) {
  return (
    <div className="flex flex-col items-start gap-1 text-sm text-zinc-500">
      <h3 className="flex items-center gap-1 text-secondary-white">
        <Icon className="h-4 w-4" /> {text}
      </h3>
      <span>{name}</span>
    </div>
  );
}
