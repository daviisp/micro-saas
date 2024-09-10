"use client";

import { HorizontalDivider } from "@/components/horizontal-divider";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { HomeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { UserDropdown } from "./user-dropdown";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { useTheme } from "next-themes";

type ClientSidebarProps = {
  user: Session["user"];
};

export function ClientSidebar({ user }: ClientSidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();

  const isActive = (href: string) => {
    return href === pathname;
  };

  return (
    <aside className="border-r flex flex-col">
      <header>
        <Logo />
        <HorizontalDivider className="w-full border-b" />
      </header>
      <nav className="ml-5 my-14 flex flex-col gap-4">
        <Link
          href="/app"
          className={cn(
            "flex items-center gap-2 text-sm p-1 mr-4 rounded-xl font-medium",
            isActive("/app") && theme.theme === "light"
              ? "bg-slate-200"
              : isActive("/app") && theme.theme === "dark"
              ? "bg-slate-800"
              : ""
          )}
        >
          <HomeIcon />
          Tasks
        </Link>
        <Link
          href="/app/settings"
          className={cn(
            "flex items-center gap-2 text-sm p-1 mr-4 rounded-full font-medium",
            isActive("/app/settings") && theme.theme === "light"
              ? "bg-slate-200"
              : isActive("/app/settings") && theme.theme === "dark"
              ? "bg-slate-800"
              : ""
          )}
        >
          <MixerVerticalIcon />
          Settings
        </Link>
      </nav>
      <footer className="mt-auto">
        <HorizontalDivider className="w-full border-t pb-2" />
        <UserDropdown user={user} />
      </footer>
    </aside>
  );
}
