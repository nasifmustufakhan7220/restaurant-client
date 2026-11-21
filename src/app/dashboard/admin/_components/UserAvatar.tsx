// Round avatar with the user's initials. Needs: name.
// FUNCTIONALITY: show the real profile image here when the user has one

const getInitials = (name: string) => {
  // "Rahim Uddin" -> "RU" (first letter of the first two words)
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};

const UserAvatar = ({ name }: { name: string }) => {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-highlight text-sm font-bold text-primary-foreground">
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;