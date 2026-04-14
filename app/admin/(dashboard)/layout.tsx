// app/(admin)/layout.tsx
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/data';
import AdminSidebar from '@/components/admin/sidebar';
import AdminHeader from '@/components/admin/Header';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  // Protection : seul l'admin peut accéder
   if (!user || user.role !== 'admin') {
     redirect('/admin/auth');
   }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar />
      
      <div className="flex-1">
        <AdminHeader user={user} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}