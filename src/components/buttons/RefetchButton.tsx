import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Spinner from "@/components/loaders/Spinner";
import { useState } from "react";

interface RefetchButtonProps {
  onRefetch: () => Promise<unknown>;
  title?: string;
}

function RefetchButton({ onRefetch, title = "Refresh" }: RefetchButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      title={title}
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      {isRefreshing ? (
        <div className="h-4 w-4">
          <Spinner />
        </div>
      ) : (
        <RefreshCw className="h-4 w-4" />
      )}
    </Button>
  );
}

export default RefetchButton;
