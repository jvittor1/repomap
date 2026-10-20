import { FileNode } from "@/lib/repository-tree";
import { TreeItem, TreeView } from "../../ui/tree-view";

function renderFileTree(node: FileNode) {
  return (
    <TreeItem
      key={node.path}
      label={node.name}
      value={node.path}
      defaultExpanded={node.path === "src"}
    >
      {node.children.map((child) => renderFileTree(child))}
    </TreeItem>
  );
}

export default function ProjectStructure({ files }: { files: FileNode[] }) {
  return <TreeView>{files.map(renderFileTree)}</TreeView>;
}
