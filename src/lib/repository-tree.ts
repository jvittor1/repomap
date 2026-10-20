type GitHubTreeEntry = {
  path: string;
  type: "blob" | "tree";
  size?: number;
};

export type FileNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children: FileNode[];
};

export function buildFileTree(entries: GitHubTreeEntry[]): FileNode[] {
  const root: FileNode[] = [];
  const nodes = new Map<string, FileNode>();

  for (const entry of entries) {
    const parts = entry.path.split("/");
    let currentPath = "";

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      let node = nodes.get(currentPath);

      if (!node) {
        const isFolder = index < parts.length - 1 || entry.type === "tree";

        node = {
          name: part,
          path: currentPath,
          type: isFolder ? "folder" : "file",
          children: [],
        };

        nodes.set(currentPath, node);

        const parentPath = parts.slice(0, index).join("/");

        const parent = nodes.get(parentPath);

        if (parent) {
          parent.children.push(node);
        } else {
          root.push(node);
        }
      }
    });
  }

  return root;
}
