import { Sidebar } from "@/components/layout/sidebar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground pt-16 relative">
      <Sidebar />
      <main className="flex-1 transition-all duration-500 ease-in-out h-[calc(100vh-4rem)] overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar px-4 sm:px-6 py-8">
          <div className="max-w-[1400px] mx-auto space-y-8 animate-fade-in pb-20 md:pb-8">
            <Breadcrumbs />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
