import React from "react";
import UsersStats from "./UsersStats";
import UsersToolbar from "./UsersToolbar";
import UsersTable from "./UsersTable";
import type { UserItem } from "@/lib/types/user";
import UserCard from "./UserCard";
import { connection } from "next/server";
import { getAllUsers } from "@/lib/api/admin";
import EmptyState from "@/app/(public)/browse/_components/EmptyState";
import { SearchX } from "lucide-react";

const UserFirstPage = async () => {
  await connection();
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
      <div >
        {users.length === 0 ? <EmptyState
          icon={<SearchX className="h-12 w-12 text-gray-400" />}
          title="No items found"
          text="Try a different search, category or location."
        /> : <div className="grid gap-3 lg:hidden">{users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}</div>}
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
