// components/admin/AdminHeader.tsx
'use client';

import { User } from "@/types";



export default function AdminHeader({ user }: {user:User} ) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-8 py-5 flex items-center justify-between sticky top-0 z-40">
      <div className="text-2xl font-semibold text-white">Administration</div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-white font-medium">{user?.full_name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        
        <div className="w-10 h-10 bg-regal-500 text-white rounded-2xl flex items-center justify-center font-bold">
          {user?.full_name.charAt(0)}
        </div>
      </div>
    </header>
  );
}