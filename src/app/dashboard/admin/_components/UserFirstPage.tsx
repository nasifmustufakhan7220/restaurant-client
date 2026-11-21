import React from "react";
import UsersStats from "./UsersStats";
import UsersToolbar from "./UsersToolbar";
import UsersTable from "./UsersTable";
import { UserItem } from "./users-data";
import UserCard from "./UserCard";
import { getAllUsers } from "@/lib/api/admin";

const UserFirstPage = async () => {
  const result:UserItem[] = await getAllUsers();
  const users = result.filter((user)=>{
    if(user.role !== "admin"){
        return user;
    }
  });

  console.log(users);
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 space-y-4">
      <UsersStats users={users} />
      <UsersToolbar />

      {/* Desktop: table (hidden below "lg") */}
      <UsersTable users={users} />

      {/* Mobile and tablet: cards (hidden from "lg") */}
      <div className="grid gap-3 lg:hidden">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-secondary">
        {/* FUNCTIONALITY: show the real count and connect pagination here */}
        <p>
          Showing {users.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="min-h-10 rounded-full border border-border px-4 font-bold opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled
            className="min-h-10 rounded-full border border-border px-4 font-bold opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFirstPage;
