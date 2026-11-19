import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSideBar from "./_components/DashboardSideBar";
import Navbar from "@/components/Navbar/Navbar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <SidebarInset>
        <header className="flex h-16 items-center border-b border-border bg-background px-4 md:px-8">
          <SidebarTrigger />
        </header>
        <main className="min-h-[calc(100vh-4rem)] bg-section p-4 md:p-8">
            <Navbar/>
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
