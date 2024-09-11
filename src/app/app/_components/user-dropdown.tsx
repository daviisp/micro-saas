import { HorizontalDivider } from "@/components/horizontal-divider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LockClosedIcon,
  MixerVerticalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type UserDropdownProps = {
  user: Session["user"];
};

export function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full mx-2 pb-8 pt-3 max-w-full">
        <Button
          variant="outline"
          className="relative h-8 w-8 rounded-full flex items-center gap-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback className="font-medium">
              {user.image ? (
                <Image
                  src={user.image}
                  width={50}
                  height={50}
                  alt={user.name!}
                  unoptimized
                />
              ) : (
                user.name?.slice(0, 1)
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
        {user.name ? (
          <span className="text-sm font-semibold">{user?.name}</span>
        ) : (
          <span className="text-xs">{user?.email}</span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none pb-1">My account</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/app/settings">
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => redirect("/app/settings")}
            >
              <PersonIcon />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/app/settings">
            <DropdownMenuItem className="flex items-center gap-2">
              <MixerVerticalIcon />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => signOut()}
        >
          <LockClosedIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
