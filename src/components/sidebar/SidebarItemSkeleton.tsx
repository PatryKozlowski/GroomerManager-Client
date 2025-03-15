import { Skeleton } from "../ui/skeleton";

function SidebarItemSkeleton() {
  return (
    <div className="flex items-center w-full p-3 my-1 text-sm rounded-lg dark:bg-primary/10 bg-gray-200/50">
      <Skeleton className="flex items-center justify-center w-5 h-5 mr-3 rounded-full dark:bg-gray-200/35 bg-primary/10" />
      <Skeleton className="h-4 w-45 dark:bg-gray-200/35 bg-primary/10 rounded" />
    </div>
  );
}

export default SidebarItemSkeleton;
