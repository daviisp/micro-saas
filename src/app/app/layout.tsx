import { PropsWithChildren } from "react";
import { ClientSidebar } from "./_components/client-sidebar";
import { auth } from "@/services/auth";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <div className="grid grid-cols-[16rem_1fr] h-screen">
      <ClientSidebar user={session!.user} />
      <main>{children}</main>
    </div>
  );
}
