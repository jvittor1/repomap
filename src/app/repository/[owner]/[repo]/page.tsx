import { getRepoData } from "@/lib/github";
import { Suspense } from "react";

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
  const repository = await getRepoData(owner, repo);

  console.log("Dados do repositório:", repository);

  return (
    <main>
      <h1>{repository.full_name}</h1>
      <p>{repository.description}</p>
      <p>Stars: {repository.stargazers_count}</p>
      <p>Forks: {repository.forks_count}</p>
      <p>Branch: {repository.default_branch}</p>
    </main>
  );
}
