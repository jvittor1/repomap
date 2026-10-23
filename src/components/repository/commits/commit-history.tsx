import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CommitGroup } from "@/lib/commits";

const TYPE_STYLES: Record<string, { dot: string; badge: string }> = {
  feat: { dot: "bg-green-500", badge: "bg-green-950 text-green-400" },
  fix: { dot: "bg-red-500", badge: "bg-red-950 text-red-400" },
  test: { dot: "bg-yellow-500", badge: "bg-yellow-950 text-yellow-400" },
  docs: { dot: "bg-blue-500", badge: "bg-blue-950 text-blue-400" },
};
const DEFAULT_STYLE = {
  dot: "bg-zinc-400",
  badge: "bg-zinc-800 text-zinc-300",
};

export function CommitTimeline({ groups }: { groups: CommitGroup[] }) {
  return (
    <Card className="rounded-sm bg-primary border border-zinc-500 p-4">
      <div className="relative pl-6">
        {/* linha vertical */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-zinc-700" />

        {groups.map((group) => (
          <section key={group.label} className="mb-6 last:mb-0">
            <h3 className="mb-3 text-xs text-zinc-400">
              {group.label} · {group.commits.length}{" "}
              {group.commits.length === 1 ? "commit" : "commits"}
            </h3>

            <ul className="flex flex-col gap-4">
              {group.commits.map((c) => {
                const style = (c.type && TYPE_STYLES[c.type]) || DEFAULT_STYLE;
                return (
                  <li key={c.sha} className="relative flex items-start gap-3">
                    {/* bolinha */}
                    <span
                      className={`absolute -left-[23px] top-1.5 size-2.5 rounded-full ${style.dot}`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-secondary-white">
                        {c.type && (
                          <Badge
                            className={`mr-2 rounded px-1.5 py-0 text-[11px] ${style.badge}`}
                          >
                            {c.type}
                          </Badge>
                        )}
                        {c.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-400">
                        <Avatar className="size-4">
                          <AvatarImage src={c.avatarUrl} />
                          <AvatarFallback className="text-[10px]">
                            {c.authorName[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {c.authorName} · {c.time}
                      </div>
                    </div>

                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded border border-zinc-600 px-1.5 py-0.5 font-mono text-xs text-zinc-400 hover:bg-zinc-800"
                    >
                      {c.sha.slice(0, 7)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Card>
  );
}
