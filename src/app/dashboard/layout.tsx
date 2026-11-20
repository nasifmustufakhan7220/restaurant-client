import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "./_components/DashboardSideBar";
import Navbar from "@/components/Navbar/Navbar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex min-h-screen flex-col">
      <Navbar variant="dashboard" />
      <div className="flex min-h-0 flex-1">
        <DashboardSideBar />
        <SidebarInset className="min-h-0 min-w-0 flex-1 overflow-auto bg-section p-4 md:p-8">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
