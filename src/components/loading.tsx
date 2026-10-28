import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function Loading({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center w-full bg-primary">
      <Button
        variant="outline"
        disabled
        size="default"
        className="bg-primary text-secondary-white rounded-sm "
      >
        <Spinner data-icon="inline-start" />
        {message}
      </Button>
    </div>
  );
}
