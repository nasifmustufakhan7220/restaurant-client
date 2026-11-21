
import UserActions from "./UserActions";
import UserAvatar from "./UserAvatar";
import UserBadge from "./UserBadge";
import { formatDateTime, UserItem } from "./users-data";

const tableHeaders = [
  "User",
  "Role",
  "Plan",
  "Joined",
  "Actions",
];

const cellStyles = "border-b border-table-border px-4 py-3.5";

const UsersTable = ({ users }: { users: UserItem[] }) => {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card lg:block">
      <table className="w-full min-w-190 border-collapse text-left">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap border-b border-table-border px-4 py-3.5 text-sm font-semibold text-table-header"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={user.isBlocked ? "opacity-60" : ""}
            >
              <td className={cellStyles}>
                <div className="flex min-w-0 items-center gap-3">
                  <UserAvatar name={user.name} />
                  <div className="min-w-0">
                    <p className="truncate font-bold text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-text-muted">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className={cellStyles}>
                <UserBadge tone={user.role}>
                  {user.role}
                </UserBadge>
              </td>

              <td className={cellStyles}>
                {user.subscriptionPlan ? (
                  <UserBadge tone={user.subscriptionPlan}>
                    {user.subscriptionPlan}
                  </UserBadge>
                ) : (
                  "—"
                )}
              </td>

              <td
                className={`${cellStyles} whitespace-nowrap text-text-secondary`}
              >
                {formatDateTime(user.createdAt)}
              </td>

              <td className={cellStyles}>
                <UserActions
                  isBlocked={user.isBlocked}
                  user={user}
                  className="flex gap-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
