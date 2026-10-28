# RepoMap

> Explore qualquer repositório do GitHub. Entenda a estrutura, veja os principais arquivos e descubra mais sobre o projeto de forma rápida e fácil.

## 📋 Sobre o Projeto

O **RepoMap** é uma aplicação web que permite explorar e analisar repositórios públicos do GitHub de forma visual e intuitiva. Basta informar o dono e o nome do repositório para obter uma visão completa sobre a estrutura, linguagens, commits e arquivos do projeto.

## ✨ Funcionalidades

- **Visão Geral** — Exibe o README do repositório, linguagens utilizadas, estrutura de diretórios e informações gerais (criação, licença, tamanho, forks, watchers, issues abertas).
- **Explorador de Arquivos** — Navegue pela árvore de arquivos com busca por nome e filtro por extensão. Veja as categorias de arquivos e os maiores arquivos do repositório.
- **Análise de Linguagens** — Linguagem dominante, total de código em bytes, quantidade de linguagens e arquivos de código. Tabela detalhada com percentuais e composição por pasta.
- **Histórico de Commits** — Timeline agrupada por dia com suporte a busca por mensagem ou autor e filtro por tipo de commit (conventional commits). Paginação progressiva com "Carregar mais".

## 🛠️ Tecnologias

| Tecnologia                                                                | Versão | Uso                              |
| ------------------------------------------------------------------------- | ------ | -------------------------------- |
| [Next.js](https://nextjs.org/)                                            | 16.4.3 | Framework principal (App Router) |
| [React](https://react.dev/)                                               | 19.3.0 | UI                               |
| [TypeScript](https://www.typescriptlang.org/)                             | ^5     | Tipagem estática                 |
| [Tailwind CSS](https://tailwindcss.com/)                                  | ^4     | Estilização                      |
| [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/)     | —      | Componentes de interface         |
| [Lucide React](https://lucide.dev/)                                       | ^1.57  | Ícones                           |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | —      | Formulários e validação          |
| [react-markdown](https://github.com/remarkjs/react-markdown)              | ^10.1  | Renderização do README           |
| [GitHub REST API](https://docs.github.com/en/rest)                        | v3     | Fonte de dados                   |

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou outro gerenciador de pacotes compatível

### Instalação

```bash
# Clone o repositório
git clone https://github.com/jvittor1/repomap.git
cd repomap

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build de Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                        # Página inicial (busca de repositório)
│   ├── layout.tsx                      # Layout raiz
│   ├── globals.css                     # Estilos globais
│   └── repository/[owner]/[repo]/
│       └── page.tsx                    # Página de detalhes do repositório
├── components/
│   ├── home/
│   │   ├── forms.tsx                   # Formulário de busca
│   │   └── feature-card.tsx            # Cards de funcionalidades
│   ├── repository/
│   │   ├── general/                    # Aba "Visão Geral"
│   │   ├── files/                      # Aba "Arquivos"
│   │   ├── languages/                  # Aba "Linguagens"
│   │   ├── commits/                    # Aba "Commits"
│   │   ├── project-structure-card.tsx  # Componente de árvore de arquivos
│   │   └── search-bar.tsx              # Barra de busca/filtro compartilhada
│   ├── ui/                             # Componentes base (shadcn/ui)
│   ├── loading.tsx                     # Indicador de carregamento
│   └── language-stat.tsx               # Estatísticas de linguagens
├── lib/
│   ├── github.ts                       # Chamadas à API do GitHub
│   ├── commits.ts                      # Parsing e agrupamento de commits
│   ├── files.ts                        # Utilitários de arquivos (busca, stats)
│   ├── language.ts                     # Análise de linguagens por pasta
│   ├── language-colors.ts              # Mapa de cores por linguagem
│   └── repository-tree.ts              # Construção da árvore de diretórios
├── types/
│   └── repository.ts                   # Tipos TypeScript do repositório
├── hooks/
│   └── use-controllable-state.ts       # Hook de estado controlável
└── utils/
    └── date-formatter.ts               # Utilitário de formatação de datas
```

## 🔌 Integração com a API do GitHub

O projeto consome a **GitHub REST API v3** (sem autenticação). As seguintes rotas são utilizadas:

| Endpoint                                                   | Dados                             |
| ---------------------------------------------------------- | --------------------------------- |
| `GET /repos/{owner}/{repo}`                                | Informações gerais do repositório |
| `GET /repos/{owner}/{repo}/languages`                      | Linguagens e bytes por linguagem  |
| `GET /repos/{owner}/{repo}/readme`                         | Conteúdo do README (base64)       |
| `GET /repos/{owner}/{repo}/commits`                        | Últimos 100 commits               |
| `GET /repos/{owner}/{repo}/git/trees/{branch}?recursive=1` | Árvore de arquivos completa       |

> **Nota:** A API pública do GitHub possui limite de requisições de **60 req/hora** para IPs não autenticados. Para repositórios grandes ou uso intenso, considere adicionar um token de acesso.
