import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "./_components/DashboardSideBar";
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="h-16" />}>
        <Navbar variant="dashboard" />
      </Suspense>

      <div className="flex min-h-0 flex-1">
        <Suspense fallback={<div className="w-64" />}>
        <DashboardSideBar />
      </Suspense>
        <SidebarInset className="min-h-0 min-w-0 flex-1 overflow-auto bg-section p-4 md:p-8">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
