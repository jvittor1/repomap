import { Separator } from "@/components/ui/separator";
import { RepositoryInfo } from "@/types/repository";

function TextInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-base gap-4">
      <span className=" text-zinc-300">{label}</span>
      <span className=" text-zinc-400 text-right">{value}</span>
    </div>
  );
}

export default function InfoRepository({
  repository,
}: {
  repository: RepositoryInfo;
}) {
  const items = [
    {
      label: "Criado em",
      value: new Date(repository.created_at).toLocaleDateString("pt-BR"),
    },
    {
      label: "Licença",
      value: repository.license?.name ?? "N/A",
    },
    {
      label: "Tamanho",
      value:
        repository.size > 0
          ? `${(repository.size / 1024).toFixed(2)} MB`
          : "N/A",
    },
    {
      label: "Watchers",
      value: String(repository.watchers_count),
    },
    {
      label: "Issues abertas",
      value: String(repository.open_issues_count),
    },
    {
      label: "Forks",
      value: String(repository.forks_count),
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {items.map((item, index) => (
        <div key={item.label}>
          <div className="py-2">
            <TextInfo label={item.label} value={item.value} />
          </div>

          {index < items.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
