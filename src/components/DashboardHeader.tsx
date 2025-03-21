interface DashboardHeaderProps {
  title: string;
  description: string;
}

function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </>
  );
}

export default DashboardHeader;
