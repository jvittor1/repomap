import { FolderIcon } from "lucide-react";
import { formatBytes } from "@/lib/files";
import { languageColors } from "@/lib/language-colors";
import LanguagesCardInfos from "./languages-card-infos";
import { FolderComposition } from "@/lib/language";

const FALLBACK_COLOR = "#8b8b8b";

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function getSummary(folder: FolderComposition) {
  const [top, ...rest] = folder.segments;
  if (rest.length === 0) return `100% ${top.language}`;
  const others = 100 - Math.round(top.percent);
  return `${formatPercent(top.percent)} ${top.language} · ${others}% outras`;
}

export function LanguagesFolderComposition({
  folders,
}: {
  folders: FolderComposition[];
}) {
  return (
    <LanguagesCardInfos title="Composição por pasta">
      {folders.length === 0 ? (
        <span className="text-sm text-zinc-400">
          Nenhuma pasta com código encontrada.
        </span>
      ) : (
        <div className="flex flex-col w-full gap-5">
          {folders.map((folder) => (
            <div key={folder.name} className="flex flex-col w-full gap-2">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span className="text-white flex items-center gap-2">
                  <FolderIcon size={12} />
                  {folder.name}
                </span>
                <span>{formatBytes(folder.totalBytes)}</span>
              </div>

              <div className="w-full h-2 bg-transparent rounded-xl overflow-hidden flex gap-0.75">
                {folder.segments.map((segment) => (
                  <div
                    key={segment.language}
                    title={`${segment.language}: ${segment.percent.toFixed(1)}%`}
                    className="h-2"
                    style={{
                      width: `${segment.percent}%`,
                      minWidth: "3px",
                      backgroundColor:
                        languageColors[segment.language] ?? FALLBACK_COLOR,
                    }}
                  />
                ))}
              </div>

              <span className="text-zinc-400 text-xs">
                {getSummary(folder)}
              </span>
            </div>
          ))}
        </div>
      )}
    </LanguagesCardInfos>
  );
}
