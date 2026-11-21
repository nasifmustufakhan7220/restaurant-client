import UserActions from "./UserActions";
import UserAvatar from "./UserAvatar";
import UserBadge from "./UserBadge";
import { UserItem } from "./users-data";


// One user as a card, for mobile and tablet. Needs: user.
const UserCard = ({ user }: { user: UserItem }) => {
  const status = user.isBlocked ? "blocked" : "active";
  console.log(user.businessName);

  return (
    <article
      className={`grid gap-3 rounded-2xl border border-border bg-card p-4 ${
        user.isBlocked ? "opacity-60" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar name={user.name} />
        <div className="min-w-0">
          <p className="truncate font-bold text-foreground">{user.name}</p>
          <p className="truncate text-sm text-text-muted">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <UserBadge tone={user.role}>{user.role}</UserBadge>
        {user.subscriptionPlan && (
          <UserBadge tone={user.subscriptionPlan}>{user.subscriptionPlan}</UserBadge>
        )}
        <UserBadge tone={status}>{status}</UserBadge>
      </div>
      
      <UserActions isBlocked={user.isBlocked} className="grid grid-cols-2 gap-2" />
    </article>
  );
};

export default UserCard;