import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full p-3 my-1 text-sm transition-all duration-200 rounded-lg",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <div className="flex items-center justify-center w-5 h-5 mr-3">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default SidebarItem;
