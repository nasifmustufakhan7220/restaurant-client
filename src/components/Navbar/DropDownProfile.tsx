"use client";

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export type DropdownMenuProfileProps = {
  email: string;
  emailVerified: boolean;
  id: string;
  name: string;
  role: string;
};
export function DropdownMenuProfile({
  data,
}: {
  data: DropdownMenuProfileProps;
}) {
  const router = useRouter();
  const handelSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };
  console.log(data);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Image
            className="rounded-full"
            src="https://github.com/shadcn.png"
            alt="Open"
            width={32}
            height={32}
          />
        }
      />
      <DropdownMenuContent className="w-56 mt-7" align="end">
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className="cursor-pointer hover:text-primary" onClick={handelSignOut}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
