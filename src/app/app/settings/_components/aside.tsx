"use client";

import { cn } from "@/lib/utils";
import { MoonIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Aside() {
  const pathname = usePathname();
  const theme = useTheme();

  const isActive = (href: string) => {
    return href === pathname;
  };

  return (
    <>
      <aside>
        <nav className="flex flex-col gap-8">
          <Link
            href="/app/settings"
            className={cn(
              "flex items-center gap-2 p-1 rounded-full",
              isActive("/app/settings") && theme.theme === "light"
                ? "bg-slate-200"
                : isActive("/app/settings") && theme.theme === "dark"
                ? "bg-slate-800"
                : ""
            )}
          >
            <PersonIcon />
            My profile
          </Link>
          <Link
            href="/app/settings/theme"
            className={cn(
              "flex items-center gap-2 p-1 rounded-full",
              isActive("/app/settings/theme") && theme.theme === "light"
                ? "bg-slate-200"
                : isActive("/app/settings/theme") && theme.theme === "dark"
                ? "bg-slate-800"
                : ""
            )}
          >
            <MoonIcon />
            Theme
          </Link>
          <Link
            href="/app/settings/billing"
            className={cn(
              "flex items-center gap-2 p-1 rounded-full",
              isActive("/app/settings/billing") && theme.theme === "light"
                ? "bg-slate-200"
                : isActive("/app/settings/billing") && theme.theme === "dark"
                ? "bg-slate-800"
                : ""
            )}
          >
            <RocketIcon />
            Billing
          </Link>
        </nav>
      </aside>
    </>
  );
}
