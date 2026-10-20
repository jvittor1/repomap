const BASE_URL = "https://api.github.com";

async function githubFetch(path: string) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados do GitHub: ${response.status}`);
  }

  return response.json();
}

export function getRepository(owner: string, repo: string) {
  return githubFetch(`/repos/${owner}/${repo}`);
}

export function getRepositoryLanguages(owner: string, repo: string) {
  return githubFetch(`/repos/${owner}/${repo}/languages`);
}

export async function getRepositoryReadme(owner: string, repo: string) {
  const data = await githubFetch(`/repos/${owner}/${repo}/readme`);
  return Buffer.from(data.content, "base64").toString("utf-8");
}

export function getRepositoryCommits(owner: string, repo: string) {
  return githubFetch(`/repos/${owner}/${repo}/commits?per_page=10`);
}

export function getRepositoryTree(owner: string, repo: string, branch: string) {
  return githubFetch(
    `/repos/${owner}/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
  );
}
