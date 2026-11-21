// Small cards with numbers about this user (menu items, orders...).
// Needs: summary (list of { label, value }).
// Grid: 2 columns on mobile, 3 from "sm".

type UserSummaryCardsProps = {
  summary: { label: string; value: number }[];
};

const UserSummaryCards = ({ summary }: UserSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {summary.map((item) => (
        <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
          <p className="text-sm text-text-muted">{item.label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default UserSummaryCards;