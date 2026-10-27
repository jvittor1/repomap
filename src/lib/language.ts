import { flattenFiles, getExtension } from "./files";
import type { FileNode } from "./repository-tree";

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
  ".ts": "TypeScript",
  ".tsx": "TypeScript",
  ".js": "JavaScript",
  ".jsx": "JavaScript",
  ".mjs": "JavaScript",
  ".cjs": "JavaScript",
  ".css": "CSS",
  ".scss": "SCSS",
  ".html": "HTML",
  ".py": "Python",
  ".java": "Java",
  ".go": "Go",
  ".rs": "Rust",
  ".rb": "Ruby",
  ".php": "PHP",
  ".c": "C",
  ".cpp": "C++",
  ".cs": "C#",
  ".kt": "Kotlin",
  ".swift": "Swift",
  ".sh": "Shell",
  ".vue": "Vue",
  ".svelte": "Svelte",
};

const FILENAME_TO_LANGUAGE: Record<string, string> = {
  dockerfile: "Dockerfile",
  makefile: "Makefile",
};

export type FolderSegment = {
  language: string;
  bytes: number;
  percent: number;
};

export type FolderComposition = {
  name: string;
  totalBytes: number;
  segments: FolderSegment[];
};

const IGNORED_FOLDERS = new Set(["node_modules", "dist", "build", ".next"]);

function buildComposition(
  name: string,
  files: FileNode[],
): FolderComposition | null {
  const bytesByLanguage = new Map<string, number>();

  for (const file of files) {
    const language = getLanguageOfFile(file.name);
    const size = file.size ?? 0;
    if (language && size > 0) {
      bytesByLanguage.set(
        language,
        (bytesByLanguage.get(language) ?? 0) + size,
      );
    }
  }

  const totalBytes = [...bytesByLanguage.values()].reduce((a, b) => a + b, 0);
  if (totalBytes === 0) return null; // pasta sem código (docs, assets...)

  const segments = [...bytesByLanguage.entries()]
    .map(([language, bytes]) => ({
      language,
      bytes,
      percent: (bytes / totalBytes) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return { name, totalBytes, segments };
}

export function getFolderComposition(tree: FileNode[]): FolderComposition[] {
  const result: FolderComposition[] = [];

  // arquivos soltos na raiz
  const rootFiles = tree.filter((n) => n.type === "file");
  const root = buildComposition("(raiz)", rootFiles);
  if (root) result.push(root);

  // cada pasta do primeiro nível
  for (const node of tree) {
    if (node.type !== "folder" || IGNORED_FOLDERS.has(node.name)) continue;
    const composition = buildComposition(
      node.name,
      flattenFiles(node.children),
    );
    if (composition) result.push(composition);
  }

  return result.sort((a, b) => b.totalBytes - a.totalBytes);
}

export function getLanguageOfFile(name: string): string | null {
  return (
    FILENAME_TO_LANGUAGE[name.toLowerCase()] ??
    EXTENSION_TO_LANGUAGE[getExtension(name)] ??
    null
  );
}

// recebe a lista plana (a mesma "allFiles" da aba Arquivos)
export function countFilesByLanguage(
  allFiles: FileNode[],
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const file of allFiles) {
    const language = getLanguageOfFile(file.name);
    if (language) counts[language] = (counts[language] ?? 0) + 1;
  }

  return counts;
}
