import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface LanguagesCardInfosProps {
  title: string;
  children: React.ReactNode;
}

export default function LanguagesCardInfos({
  title,
  children,
}: LanguagesCardInfosProps) {
  return (
    <Card className="bg-primary border border-zinc-500 p-4 rounded-sm text-white w-full">
      <CardTitle className="text-sm text-zinc-400">{title}</CardTitle>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
