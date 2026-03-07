import { Sidebar } from "@/components/layout/sidebar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-60 transition-all duration-300 ease-in-out md:ml-16 lg:ml-60 overflow-auto">
        <Breadcrumbs />
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </main>
    </div>
  )
}
