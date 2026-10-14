const BASE_URL = "https://api.github.com";

export async function getRepository(owner: string, repo: string) {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar repositório");
  }

  return response.json();
}

export async function getRepositoryLanguages(owner: string, repo: string) {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/languages`);

  if (!response.ok) {
    throw new Error("Erro ao buscar linguagens");
  }

  return response.json();
}
