import { cn } from "@/lib/utils";

// Round avatar with the user's initials. Needs: name. Optional: className to change the size.
// FUNCTIONALITY: show the real profile image here when the user has one

const getInitials = (name: string) => {
  // "Rahim Uddin" -> "RU" (first letter of the first two words)
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};

type UserAvatarProps = {
  name: string;
  className?: string;
};

const UserAvatar = ({ name, className }: UserAvatarProps) => {
  return (
    <div
      className={cn(
        // cn() lets the className from outside replace the default size-10
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-highlight text-sm font-bold text-primary-foreground",
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;