type GithubCommit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { name: string; date: string } };
  author: { login: string; avatar_url: string } | null;
};

// change the date, the format rn is this one: 2026-06-17T20:28:50Z
//  i need to format is like 20:28.

const TYPE_REGEX = /^(\w+)(\([^)]*\))?!?:\s*/;

export function toCommitItem(c: GithubCommit) {
  const title = c.commit.message.split("\n")[0];
  const match = title.match(TYPE_REGEX);

  return {
    sha: c.sha,
    title: match ? title.replace(TYPE_REGEX, "") : title,
    type: match ? match[1].toLowerCase() : null,
    authorName: c.author?.login ?? c.commit.author.name,
    avatarUrl: c.author?.avatar_url,
    date: c.commit.author.date,
    url: c.html_url,
    time: c.commit.author.date.split("T")[1].split(".")[0],
  };
}

export type CommitItem = ReturnType<typeof toCommitItem>;
export type CommitView = CommitItem & { time: string };
export type CommitGroup = { label: string; commits: CommitView[] };

// Roda no navegador, para usar o fuso do usuário
export function groupCommitsByDay(items: CommitItem[]): CommitGroup[] {
  const keyFmt = new Intl.DateTimeFormat("en-CA"); // 2026-06-18
  const labelFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const groups = new Map<string, CommitGroup>();

  for (const item of items) {
    const date = new Date(item.date);
    const key = keyFmt.format(date);

    if (!groups.has(key)) {
      groups.set(key, { label: labelFmt.format(date), commits: [] });
    }
    groups.get(key)!.commits.push({ ...item, time: timeFmt.format(date) });
  }

  return [...groups.values()];
}

export function getTopTypes(
  items: CommitItem[],
  limit = 5,
): [string, number][] {
  const counts = new Map<string, number>();

  for (const item of items) {
    if (item.type) counts.set(item.type, (counts.get(item.type) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}
