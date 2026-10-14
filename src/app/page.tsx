import { FeatureCard } from "@/components/home/feature-card";
import Forms from "@/components/home/forms";
import { Separator } from "@/components/ui/separator";
import { Folder, Code, ChartNoAxesColumnIncreasing } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 flex-1 items-center justify-start bg-primary py-18 px-6">
      <div className="flex flex-col items-center gap-3">
        <Image
          className="rounded-full bg-white"
          src="/images/github.svg"
          alt="GitHub"
          width={48}
          height={48}
        />

        <h1 className="text-3xl font-bold text-secondary-white">RepoMap</h1>
        <p className="text-zinc-400 text-sm text-center">
          Explore qualquer repositório do GitHub.
          <br />
          Entenda a estrutura, veja os principais arquivos e descubra <br />{" "}
          mais sobre o projeto de forma rápida e fácil.
        </p>
      </div>

      <Forms />

      <div className="flex items-center gap-4">
        <FeatureCard
          icon={Folder}
          title="Estrutura do Repositório"
          description="Visualize a estrutura de diretórios e arquivos do repositório, facilitando a navegação e compreensão do projeto."
        />
        <div>
          <Separator orientation="vertical" className="h-16 bg-zinc-700" />
        </div>

        <FeatureCard
          icon={Code}
          title="Análise de Código"
          description="Descubra insights sobre o código do repositório, incluindo métricas de qualidade e padrões de desenvolvimento."
        />
        <div>
          <Separator orientation="vertical" className="h-16 bg-zinc-700" />
        </div>

        <FeatureCard
          icon={ChartNoAxesColumnIncreasing}
          title="Métricas de Qualidade"
          description="Avalie a qualidade do código do repositório com métricas detalhadas e insights sobre o desempenho do projeto."
        />
      </div>
    </div>
  );
}
