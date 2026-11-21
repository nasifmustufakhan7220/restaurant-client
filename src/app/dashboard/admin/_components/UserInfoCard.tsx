import type { UserDetails } from "./user-details-data";

// Card with the basic profile information. Needs: user.
const UserInfoCard = ({ user }: { user: UserDetails }) => {
  // Each row is { label, value }. To add a new row, add one line here.
  const infoRows = [
    { label: "Full name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    { label: "Joined", value: user.createdAt },
    { label: "User ID", value: user._id },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h2 className="mb-3 text-lg font-semibold text-foreground">Profile information</h2>

      <dl>
        {infoRows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-4 border-t border-table-border py-3"
          >
            <dt className="text-text-secondary">{row.label}</dt>
            {/* break-all: a long email or ID wraps and never pushes the layout wider */}
            <dd className="break-all text-right font-bold capitalize text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default UserInfoCard;