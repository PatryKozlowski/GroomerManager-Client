import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="relative w-40">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">404</span>
        </div>
      </div>
      <div className="max-w-md space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Nie znaleziono strony
        </h1>
        <p className="text-muted-foreground">
          Oops! Strona, której szukasz, nie istnieje. Może została przeniesiona,
          usunięta lub nigdy nie istniała.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="default"
          onClick={() => navigate(-1)}
          className="min-w-32"
        >
          Cofnij
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/login")}
          className="min-w-32"
        >
          Wróć do strony głównej
        </Button>
      </div>
    </div>
  );
}
