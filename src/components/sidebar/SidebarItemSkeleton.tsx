import { Skeleton } from "../ui/skeleton";

function SidebarItemSkeleton() {
  return (
    <div className="flex items-center w-full p-3 my-1 text-sm rounded-lg dark:bg-secondary/50 bg-secondary/80">
      <Skeleton className="flex items-center justify-center w-5 h-5 mr-3 rounded-full dark:bg-muted/60 bg-primary/20" />
      <Skeleton className="h-4 w-45 dark:bg-muted/60 bg-primary/20 rounded" />
    </div>
  );
}

export default SidebarItemSkeleton;
