import { PropsWithChildren } from "react";
import { Aside } from "./_components/aside";
import { HorizontalDivider } from "@/components/horizontal-divider";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="text-muted-foreground ml-5 my-3.5 text-lg uppercase">
        <h2>Settings</h2>
      </header>
      <HorizontalDivider className="w-full border-b" />
      <div className="my-20 max-w-screen-lg mx-auto grid grid-cols-[16rem_1fr] gap-20">
        <Aside />
        <main>{children}</main>
      </div>
    </>
  );
}
