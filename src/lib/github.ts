export async function getRepoData(owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
  );

  if (response.status === 404) {
    throw new Error("Repositório não encontrado");
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do repositório");
  }

  const data = await response.json();
  return data;
}
