import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

function SalonSelectorSkeleton() {
  return (
    <div className="mr-3 bg-primary/10 rounded-md">
      <Button
        variant="outline"
        className="flex justify-between items-center gap-2"
        disabled
      >
        <div className="flex items-center gap-2 truncate">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
        <ChevronDown className="h-4 w-4 shrink-0" />
      </Button>
    </div>
  );
}

export default SalonSelectorSkeleton;
