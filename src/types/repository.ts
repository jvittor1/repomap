export interface RepositoryInfo {
  created_at: string;
  license: {
    name: string;
  } | null;
  size: number;
  watchers_count: number;
  open_issues_count: number;
  forks_count: number;
}
