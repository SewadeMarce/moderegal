
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/data';
import DashboardSidebar from '@/components/dashboard/Sedebar';
import MobileNav from '@/components/ui/dashboard/MobileNav';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }
const sidebarContent = <DashboardSidebar user={user} />
  return (
    <div className="min-h-screen bg-gray-50 flex">
{/* Sidebar Desktop : Visible uniquement sur grand écran */}
      <div className="hidden lg:block w-72 h-screen lg:fixed top-0 z-30">
        {sidebarContent}
      </div>      
      <div className="flex-1">
     {/* Navigation Mobile : Gère l'affichage de la sidebar sur petit écran */}
        <MobileNav sidebar={sidebarContent} />
        <main className="p-8 lg:ml-72">
          {children}
        </main>
      </div>
    </div>
  );
}