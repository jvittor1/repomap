"use client";

import { useMemo, useState } from "react";
import { getTopTypes, groupCommitsByDay, type CommitItem } from "@/lib/commits";
import { SearchBar } from "../search-bar";
import { CommitTimeline } from "./commit-history";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

export function CommitsTabContent({ commits }: { commits: CommitItem[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const topTypes = useMemo(() => getTopTypes(commits), [commits]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return commits.filter(
      (c) =>
        (!type || c.type === type) &&
        (!q ||
          c.title.toLowerCase().includes(q) ||
          c.authorName.toLowerCase().includes(q)),
    );
  }, [commits, query, type]);

  const groups = useMemo(
    () => groupCommitsByDay(filtered.slice(0, visible)),
    [filtered, visible],
  );

  function handleQueryChange(value: string) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }

  function handleTypeChange(value: string | null) {
    setType(value);
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        query={query}
        onQueryChange={handleQueryChange}
        ext={type}
        onExtChange={handleTypeChange}
        topExts={topTypes}
        matchCount={filtered.length}
        placeholder="Buscar na mensagem do commit..."
      />

      {groups.length > 0 ? (
        <CommitTimeline groups={groups} />
      ) : (
        <div className="border border-zinc-500 rounded-sm p-10 text-center text-sm text-zinc-400">
          Nenhum commit encontrado.
        </div>
      )}

      {visible < filtered.length && (
        <Button
          className="rounded-sm border border-zinc-500 cursor-pointer"
          variant="ghost"
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
        >
          Carregar mais ({filtered.length - visible} restantes)
        </Button>
      )}
    </div>
  );
}
