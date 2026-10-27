import { Card } from "@/components/ui/card";
import { flattenFiles, formatBytes } from "@/lib/files";
import { countFilesByLanguage, getFolderComposition } from "@/lib/language";
import { FileNode } from "@/lib/repository-tree";
import { LanguagesTableCard } from "./languages-table-card";
import LanguagesCardInfos from "./languages-card-infos";
import { FolderIcon } from "lucide-react";
import { LanguagesFolderComposition } from "./languages-folder-composition";

export function LanguagesTabContent({
  languages,
  files,
}: {
  languages: Record<string, number>;
  files: FileNode[];
}) {
  if (Object.keys(languages).length === 0) {
    return (
      <Card className="bg-primary border border-zinc-500 p-10 rounded-sm text-center text-sm text-zinc-400">
        Nenhuma linguagem detectada neste repositório.
      </Card>
    );
  }

  const fileCounts = countFilesByLanguage(flattenFiles(files));

  const total = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);

  // dominante = a que tem mais bytes
  const [dominantLanguage, dominantBytes] = Object.entries(languages).reduce(
    (acc, entry) => (entry[1] > acc[1] ? entry : acc),
    ["", 0] as [string, number],
  );

  const dominantPercent = total ? (dominantBytes / total) * 100 : 0;

  // só arquivos que pertencem a alguma linguagem
  const codeFilesCount = Object.values(fileCounts).reduce(
    (acc, count) => acc + count,
    0,
  );

  const folders = getFolderComposition(files);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <LanguagesCardInfos title="Linguagem Dominante">
          <h2 className="text-xl">{dominantLanguage}</h2>
          <span className="text-zinc-400">
            {dominantPercent.toFixed(1).replace(".", ",")}% do código
          </span>
        </LanguagesCardInfos>

        <LanguagesCardInfos title="Total de Código">
          <h2 className="text-xl">{formatBytes(total)}</h2>
        </LanguagesCardInfos>

        <LanguagesCardInfos title="Linguagens">
          <h2 className="text-xl">{Object.keys(languages).length}</h2>
        </LanguagesCardInfos>

        <LanguagesCardInfos title="Arquivos de Código">
          <h2 className="text-xl">{codeFilesCount}</h2>
        </LanguagesCardInfos>
      </div>

      <LanguagesTableCard languages={languages} fileCounts={fileCounts} />

      <div className="flex gap-4">
        <LanguagesFolderComposition folders={folders} />

        <LanguagesCardInfos title="Tecnologias Detectadas">
          ...
        </LanguagesCardInfos>
      </div>
    </div>
  );
}
