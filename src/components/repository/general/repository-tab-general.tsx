"use client";
import { FileText } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "../../ui/scroll-area";

import { FileNode } from "@/lib/repository-tree";
import { RepositoryInfo } from "@/types/repository";
import LanguagesStat from "../../language-stat";
import InfoRepository from "./info-repository";
import { ProjectStructureCard } from "../project-structure-card";

interface GeneralTabContentProps {
  content: string;
  languages: Record<string, number>;
  files: FileNode[];
  repository: RepositoryInfo;
}

export function GeneralTabContent({
  content,
  languages,
  files,
  repository,
}: GeneralTabContentProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <Card className="w-full  rounded-sm bg-primary border border-zinc-500 text-secondary-white">
        <CardHeader className="border-b border-zinc-500">
          <CardTitle className="flex items-end gap-2 text-sm">
            <FileText /> README
          </CardTitle>
        </CardHeader>
        <ScrollArea className="h-80  px-2">
          <CardContent className="prose prose-invert max-w-full">
            <ReactMarkdown>{content}</ReactMarkdown>
          </CardContent>
        </ScrollArea>
      </Card>

      <Card className="w-full  rounded-sm bg-primary border border-zinc-500 text-secondary-white">
        <CardHeader className="border-b border-zinc-500">
          <CardTitle className="text-sm">Linguagens</CardTitle>
        </CardHeader>
        <ScrollArea className="h-80 px-2">
          <CardContent className="prose prose-invert max-w-full">
            <LanguagesStat languages={languages} />
          </CardContent>
        </ScrollArea>
      </Card>

      <ProjectStructureCard files={files} />

      <Card className="w-full  rounded-sm bg-primary border border-zinc-500 text-secondary-white">
        <CardHeader className="border-b border-zinc-500">
          <CardTitle className="text-sm">Informações do Repositório</CardTitle>
        </CardHeader>
        <ScrollArea className="h-80 px-2">
          <CardContent className="prose prose-invert max-w-full">
            <InfoRepository repository={repository} />
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
