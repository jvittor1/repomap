import { FileNode } from "@/lib/repository-tree";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectStructure from "./general/project-structure";

interface ProjectStructureCardProps {
  files: FileNode[];
  className?: string;
}

export function ProjectStructureCard({
  files,
  className,
}: ProjectStructureCardProps) {
  const scrollAreaClassName = className ?? "h-90 px-2";

  return (
    <Card className="w-full  rounded-sm bg-primary border border-zinc-500 text-white">
      <CardHeader className="border-b border-zinc-500">
        <CardTitle className="flex items-end gap-2 text-sm">
          <Folder /> Estrutura do Projeto
        </CardTitle>
      </CardHeader>
      <ScrollArea className={scrollAreaClassName}>
        <CardContent className="prose prose-invert max-w-full">
          <ProjectStructure files={files} />
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
