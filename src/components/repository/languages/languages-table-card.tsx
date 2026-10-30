"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBytes } from "@/lib/files";
import { languageColors } from "@/lib/language-colors";
import { useMemo } from "react";

const FALLBACK_COLOR = "#8b8b8b";

interface LanguageStat {
  lang: string;
  bytes: number;
  percent: number;
  files: number;
  color: string;
}

export function LanguagesTableCard({
  languages,
  fileCounts,
}: {
  languages: Record<string, number>;
  fileCounts: Record<string, number>;
}) {
  const stats = useMemo(() => {
    const total = Object.values(languages).reduce((a, b) => a + b, 0);

    return Object.entries(languages)
      .map(
        ([lang, bytes]): LanguageStat => ({
          lang,
          bytes,
          percent: total ? (bytes / total) * 100 : 0,
          files: fileCounts[lang] ?? 0,
          color: languageColors[lang] ?? FALLBACK_COLOR,
        }),
      )
      .sort((a, b) => b.bytes - a.bytes);
  }, [languages, fileCounts]);

  return (
    <Card className="bg-primary border border-zinc-500 p-4 rounded-sm text-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Linguagem</TableHead>
            <TableHead></TableHead>
            <TableHead className="text-end">Porcentagem (%)</TableHead>
            <TableHead className="text-end">Bytes</TableHead>
            <TableHead className="text-end">Arquivos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.lang}>
              <TableCell>
                <div
                  className="rounded-full w-3 h-3 inline-block mr-2"
                  style={{ backgroundColor: languageColors[stat.lang] }}
                ></div>
                {stat.lang}
              </TableCell>
              <TableCell className="w-1/3">
                {/* progressbar */}
                <div className="w-full bg-zinc-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${stat.percent}%`,
                      backgroundColor: languageColors[stat.lang],
                    }}
                  ></div>
                </div>
              </TableCell>
              <TableCell className="text-end">
                {stat.percent.toFixed(2)}%
              </TableCell>
              <TableCell className="text-end">
                {formatBytes(stat.bytes)}
              </TableCell>
              <TableCell className="text-end">{stat.files}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
