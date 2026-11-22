import type { UserItem } from "@/lib/types/user";

const UsersStats = ({ users }: { users: UserItem[] }) => {
  const usersStats = [
    { label: "Total Users", value: users.length },
    { label: "Vendors", value: users.filter(user=>user.role==="vendor").length },
    { label: "Customers", value: users.filter(user=>user.role === "customer").length },
    { label: "Blocked", value: users.filter(user=>user.isBlocked).length },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {usersStats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-card p-4"
        >
          <p className="text-sm text-text-muted">{stat.label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UsersStats;
