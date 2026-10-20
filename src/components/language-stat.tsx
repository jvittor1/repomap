import { languageColors } from "@/lib/language-colors";

function IndicatorPercentage({
  name,
  percentage,
  color,
}: {
  name: string;
  percentage: number;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span>{name}</span>
        <span>{percentage.toFixed(2)}%</span>
      </div>
      <div className="w-full h-2 bg-zinc-700/80 rounded-full">
        <div
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

export default function LanguagesStat({
  languages,
}: {
  languages: Record<string, number>;
}) {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  const percentages = Object.entries(languages).map(([language, bytes]) => ({
    language,
    percentage: (bytes / total) * 100,
  }));

  return (
    <div className="flex flex-col gap-4">
      {percentages.map(({ language, percentage }) => (
        <IndicatorPercentage
          key={language}
          name={language}
          percentage={percentage}
          color={languageColors[language] ?? "#A1A1AA"}
        />
      ))}
    </div>
  );
}
