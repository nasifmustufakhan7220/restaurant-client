// The title and short description at the top of a dashboard page.
// Needs: title, description.

type DashboardPageHeaderProps = {
  title: string;
  description: string;
};

const DashboardPageHeader = ({ title, description }: DashboardPageHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-1 text-text-secondary">{description}</p>
    </div>
  );
};

export default DashboardPageHeader;