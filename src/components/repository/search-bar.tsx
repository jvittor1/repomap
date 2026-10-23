"use client";

import { Input } from "@/components/ui/input";

export interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-sm cursor-pointer px-3 py-1 text-xs transition-colors ${
        active
          ? "bg-white text-black font-medium"
          : "border border-zinc-500 text-zinc-300 hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}

export interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  ext: string | null;
  onExtChange: (ext: string | null) => void;
  topExts: [string, number][];
  placeholder?: string;
  matchCount?: number;
  className?: string;
}

export function SearchBar({
  query,
  onQueryChange,
  ext,
  onExtChange,
  topExts,
  placeholder = "Buscar...",
  matchCount,
  className = "",
}: SearchBarProps) {
  return (
    <div className={`flex items-center justify-between w-full gap-4 ${className}`}>
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="bg-primary border border-zinc-500 p-5 rounded-sm text-secondary-white w-full max-w-lg"
        placeholder={placeholder}
      />

      <div className="flex flex-wrap items-center gap-2">
        <FilterChip active={ext === null} onClick={() => onExtChange(null)}>
          Todos
        </FilterChip>

        {topExts.map(([e]) => (
          <FilterChip
            key={e}
            active={ext === e}
            onClick={() => onExtChange(ext === e ? null : e)}
          >
            {e}
          </FilterChip>
        ))}
      </div>

      {matchCount !== undefined && (
        <span className="text-xs text-zinc-400 ml-auto">
          {matchCount} {matchCount === 1 ? "arquivo" : "arquivos"}
        </span>
      )}
    </div>
  );
}
