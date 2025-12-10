import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex w-full min-h-screen bg-[#fafafa] text-gray-800">
      <Sidebar />
      <div className="flex flex-1 flex-col min-h-screen md:ml-64">
        <Topbar />
        <main className="flex-1 px-4 pb-8 pt-4 md:px-8 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}

