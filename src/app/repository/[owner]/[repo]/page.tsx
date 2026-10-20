import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { RepositoryStat } from "@/components/repository/general/repository-stat";

import { GeneralTabContent } from "@/components/repository/general/repository-tab-general";
import {
  getRepository,
  getRepositoryCommits,
  getRepositoryLanguages,
  getRepositoryReadme,
  getRepositoryTree,
} from "@/lib/github";
import { ExternalLink, GitBranch, GitFork, Star } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/utils/date-formatter";
import { buildFileTree } from "@/lib/repository-tree";
import { FilesTabContent } from "@/components/repository/files/repository-tab-files";
import { CommitsTabContent } from "@/components/repository/commits/repository-tab-commits";
import { LanguagesTabContent } from "@/components/repository/languages/repository-tab-languages";

type Props = {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
};

export default async function RepositoryPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Carregando repositório...</p>}>
      <RepositoryContent params={params} />
    </Suspense>
  );
}

async function RepositoryContent({ params }: Props) {
  const { owner, repo } = await params;
  const [repository, languages, readme, commits] = await Promise.all([
    getRepository(owner, repo),
    getRepositoryLanguages(owner, repo),
    getRepositoryReadme(owner, repo),
    getRepositoryCommits(owner, repo),
  ]);

  const tree = await getRepositoryTree(owner, repo, repository.default_branch);

  const files = buildFileTree(tree.tree);

  console.log("Dados do repositório:", repository);

  return (
    <main className="flex-1 bg-primary flex flex-col text-secondary-white py-6 px-24 gap-6">
      {/* Componente de breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>{owner}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{repo}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Componente Info gerais do repositorio */}
      <div className="flex gap-3 items-start justify-between">
        <Avatar className="w-18 h-18">
          <AvatarImage src={`https://github.com/${owner}.png`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1 items-center flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{repository.name}</h1>
          <p className="text-sm text-secondary-white/70">
            {repository.description}
          </p>

          <div className="flex gap-12 mt-2">
            <RepositoryStat
              icon={Star}
              text={repository.stargazers_count}
              name="Stars"
            />
            <RepositoryStat
              icon={GitFork}
              text={repository.forks_count}
              name="Forks"
            />
            <RepositoryStat
              icon={GitBranch}
              text={repository.default_branch}
              name="Branch Principal"
            />
            <RepositoryStat
              icon={ExternalLink}
              text={formatDate(commits[0]?.commit.author.date) || "N/A"}
              name="Último Commit"
            />
          </div>
        </div>

        <Link
          className="rounded-md px-4 py-2 text-sm flex gap-2 items-center bg-primary  text-zinc-300 border border-zinc-600  hover:text-secondary-white hover:border-zinc-300 hover:shadow-md
              active:scale-[0.98]
              transition-all duration-200"
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={18} />
          <span>Ver no GitHub</span>
        </Link>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="general" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="general">Visão Geral</TabsTrigger>
            <TabsTrigger value="files">Arquivos</TabsTrigger>
            <TabsTrigger value="commits">Commits</TabsTrigger>
            <TabsTrigger value="languages">Linguagens</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralTabContent
              content={readme}
              languages={languages}
              files={files}
              repository={repository}
            />
          </TabsContent>
          <TabsContent value="files">
            <FilesTabContent />
          </TabsContent>
          <TabsContent value="commits">
            <CommitsTabContent />
          </TabsContent>
          <TabsContent value="languages">
            <LanguagesTabContent languages={languages} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
