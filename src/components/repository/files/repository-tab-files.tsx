"use client";

import { FileNode } from "@/lib/repository-tree";
import { ProjectStructureCard } from "../project-structure-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  filterTree,
  flattenFiles,
  formatBytes,
  getCategoryStats,
  getLargestFiles,
  getTopExtensions,
} from "@/lib/files";
import { useMemo, useState } from "react";
import { SearchBar } from "../search-bar";

interface FilesTabProps {
  files: FileNode[];
}

interface CardContentProps {
  title: string;
  children: React.ReactNode;
}

function CardContentBox({ title, children }: CardContentProps) {
  return (
    <Card className=" bg-primary border border-zinc-500 p-5 rounded-sm text-white px-0">
      <CardHeader>
        <CardTitle className="text-sm text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function FilesTabContent({ files }: FilesTabProps) {
  const [query, setQuery] = useState("");
  const [ext, setExt] = useState<string | null>(null);

  // calculos sobre a arvore completa: nao mudam com o filtro
  const allFiles = useMemo(() => flattenFiles(files), [files]);
  const largest = useMemo(() => getLargestFiles(allFiles, 5), [allFiles]);
  const categories = useMemo(() => getCategoryStats(allFiles), [allFiles]);

  const topExts = useMemo(() => getTopExtensions(allFiles, 5), [allFiles]);
  const maxSize = largest[0]?.size ?? 1;

  // arvore que sera exibida
  const filteredFiles = useMemo(
    () => filterTree(files, query, ext),
    [files, query, ext],
  );
  const isFiltering = query.trim() !== "" || ext !== null;
  const matchCount = useMemo(
    () => (isFiltering ? flattenFiles(filteredFiles).length : allFiles.length),
    [filteredFiles, isFiltering, allFiles],
  );

  return (
    <div className="flex flex-col gap-2">
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        ext={ext}
        onExtChange={setExt}
        topExts={topExts}
        matchCount={matchCount}
        placeholder="Buscar por nome de arquivos ou pasta..."
      />

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3">
          {filteredFiles.length > 0 ? (
            <ProjectStructureCard
              key={isFiltering ? "filtered" : "default"}
              files={filteredFiles}
              className="h-[calc(100vh-300px)] px-2"
            />
          ) : (
            <div className="border h-[calc(100vh-300px)] border-zinc-500 rounded-sm p-10 text-center text-sm text-zinc-400">
              Nenhum arquivo encontrado.
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 col-span-1">
          <CardContentBox title="Por Categoria">
            <div className="flex flex-col gap-4">
              <div className="w-full flex rounded-lg bg-transparent h-2 gap-1 overflow-hidden">
                {categories.map((c) => (
                  <div
                    key={c.key}
                    style={{
                      width: `${c.percentage}%`,
                      backgroundColor: c.color,
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {categories.map((c) => (
                  <div
                    key={c.key}
                    className="flex w-full justify-between items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-zinc-400 text-sm">{c.label}</span>
                    </div>
                    <span className="text-zinc-400 text-sm">
                      {c.count} ({c.percentage.toFixed(0)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContentBox>
          <CardContentBox title="Maiores Arquivos">
            <div className="flex flex-col gap-3 w-full">
              {largest.map((file) => (
                <div key={file.path} className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between gap-2 text-white">
                    <span className="text-sm truncate" title={file.path}>
                      {file.name}
                    </span>
                    <span className="text-zinc-400 text-sm shrink-0">
                      {formatBytes(file.size ?? 0)}
                    </span>
                  </div>
                  <div className="w-full rounded-lg bg-zinc-700 h-1">
                    <div
                      className="rounded-lg bg-gray-400 h-1"
                      style={{
                        width: `${((file.size ?? 0) / maxSize) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContentBox>
        </div>
      </div>
    </div>
  );
}
