import { FileNode } from "./repository-tree";

export type CategoryKey = "code" | "style" | "config" | "other";

export type CategoryStat = {
  key: CategoryKey;
  label: string;
  color: string;
  count: number;
  percentage: number;
};

const CATEGORY_BY_EXT: Record<string, CategoryKey> = {
  ".ts": "code",
  ".tsx": "code",
  ".js": "code",
  ".jsx": "code",
  ".mjs": "code",
  ".cjs": "code",
  ".py": "code",
  ".go": "code",
  ".java": "code",
  ".rs": "code",
  ".sql": "code",
  ".prisma": "code",
  ".html": "code",
  ".css": "style",
  ".scss": "style",
  ".sass": "style",
  ".less": "style",
  ".json": "config",
  ".yml": "config",
  ".yaml": "config",
  ".toml": "config",
  ".env": "config",
};

const CONFIG_NAMES = new Set(["dockerfile", "makefile"]);

export function getCategory(name: string): CategoryKey {
  const lower = name.toLowerCase();
  const ext = getExtension(name);

  if (ext && CATEGORY_BY_EXT[ext]) return CATEGORY_BY_EXT[ext];
  if (CONFIG_NAMES.has(lower)) return "config";
  // arquivos ocultos sem extensão: .gitignore, .prettierrc...
  if (lower.startsWith(".") && !ext) return "config";
  return "other"; // md, svg, png, db...
}

const CATEGORY_META: Record<CategoryKey, { label: string; color: string }> = {
  code: { label: "Código", color: "#3b82f6" },
  style: { label: "Estilo", color: "#22c55e" },
  config: { label: "Configuração", color: "#ef4444" },
  other: { label: "Documentação e Outros", color: "#9ca3af" },
};

export function getCategoryStats(files: FileNode[]): CategoryStat[] {
  const counts: Record<CategoryKey, number> = {
    code: 0,
    style: 0,
    config: 0,
    other: 0,
  };

  for (const f of files) counts[getCategory(f.name)]++;

  const total = files.length || 1;

  return (Object.keys(counts) as CategoryKey[])
    .map((key) => ({
      key,
      ...CATEGORY_META[key],
      count: counts[key],
      percentage: (counts[key] / total) * 100,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function flattenFiles(nodes: FileNode[]): FileNode[] {
  return nodes.flatMap((n) =>
    n.type === "file" ? [n] : flattenFiles(n.children),
  );
}

export function getExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i <= 0 ? "" : name.slice(i).toLowerCase();
}

export function getTopExtensions(files: FileNode[], limit = 5) {
  const counts = new Map<string, number>();
  for (const f of files) {
    const ext = getExtension(f.name);
    if (ext) counts.set(ext, (counts.get(ext) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const LOCKFILES = new Set([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
]);

export function getLargestFiles(files: FileNode[], limit = 5) {
  return files
    .filter((f) => (f.size ?? 0) > 0)
    .filter((f) => !LOCKFILES.has(f.name))
    .sort((a, b) => (b.size ?? 0) - (a.size ?? 0))
    .slice(0, limit);
}

// filtros

function filterNode(
  node: FileNode,
  query: string,
  ext: string | null,
): FileNode | null {
  if (node.type === "file") {
    const matchesQuery = !query || node.name.toLowerCase().includes(query);
    const matchesExt = !ext || getExtension(node.name) === ext;
    return matchesQuery && matchesExt ? node : null;
  }

  // se o nome da pasta combina com a busca, os filhos não precisam combinar
  const folderMatches = !!query && node.name.toLowerCase().includes(query);
  const childQuery = folderMatches ? "" : query;

  const children = node.children
    .map((child) => filterNode(child, childQuery, ext))
    .filter((child): child is FileNode => child !== null);

  // pasta sem nenhum descendente que combine some da lista
  return children.length > 0 ? { ...node, children } : null;
}

export function filterTree(
  nodes: FileNode[],
  query: string,
  ext: string | null,
): FileNode[] {
  const q = query.trim().toLowerCase();
  if (!q && !ext) return nodes;

  return nodes
    .map((node) => filterNode(node, q, ext))
    .filter((node): node is FileNode => node !== null);
}
