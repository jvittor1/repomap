import LanguagesStat from "@/components/language-stat";

export function LanguagesTabContent({
  languages,
}: {
  languages: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-2">
      <LanguagesStat languages={languages} />
    </div>
  );
}
