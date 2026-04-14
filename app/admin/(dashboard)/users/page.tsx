// app/(admin)/users/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Edit2, 
  Trash2, 
  Search, 
  Shield, 
  UserCheck, 
  Clock 
} from 'lucide-react';

interface User {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  created_at: string;
  total_orders?: number;
  status: 'active' | 'inactive';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'admin'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Simulation de données utilisateurs
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    
    const mockUsers: User[] = [
      {
        id: 1,
        full_name: "Jean Koffi",
        email: "jean.koffi@email.com",
        phone: "0123456789",
        role: "customer",
        created_at: "2025-02-15",
        total_orders: 12,
        status: "active"
      },
      {
        id: 2,
        full_name: "Aïcha Bello",
        email: "aicha.bello@email.com",
        phone: "0198765432",
        role: "customer",
        created_at: "2025-03-01",
        total_orders: 8,
        status: "active"
      },
      {
        id: 3,
        full_name: "Mohamed Traoré",
        email: "admin@moderegal.bj",
        phone: "0234567890",
        role: "admin",
        created_at: "2024-12-10",
        total_orders: 0,
        status: "active"
      },
      {
        id: 4,
        full_name: "Sophie Lawson",
        email: "sophie.lawson@email.com",
        phone: "0145678901",
        role: "customer",
        created_at: "2025-04-05",
        total_orders: 3,
        status: "inactive"
      },
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setIsLoading(false);
  };

  // Filtrage
  useEffect(() => {
    let result = [...users];

    if (searchTerm.trim()) {
      result = result.filter(user => 
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, users]);

  const toggleUserRole = (userId: number) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          role: user.role === 'customer' ? 'admin' : 'customer'
        };
      }
      return user;
    }));
    alert("Rôle modifié (simulation)");
  };

  const deleteUser = (userId: number) => {
    if (!confirm("Supprimer cet utilisateur ? Cette action est irréversible.")) return;
    
    setUsers(prev => prev.filter(user => user.id !== userId));
    alert("Utilisateur supprimé (simulation)");
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Gestion des Utilisateurs</h1>
          <p className="text-gray-400 mt-2">{filteredUsers.length} utilisateurs inscrits</p>
        </div>

        <button
          onClick={() => { setEditingUser(null); setShowAddModal(true); }}
          className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-bold px-8 py-4 rounded-3xl transition-all"
        >
          <UserPlus size={24} />
          Nouvel utilisateur
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 pl-14 py-4 rounded-3xl text-white placeholder-gray-500 focus:outline-none focus:border-regal-500"
          />
        </div>

        <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-3xl px-6 py-2">
          <Shield size={20} className="text-gray-400" />
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'all' | 'customer' | 'admin')}
            className="bg-transparent border-0 focus:outline-none text-white"
          >
            <option value="all">Tous les rôles</option>
            <option value="customer">Clients</option>
            <option value="admin">Administrateurs</option>
          </select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Utilisateur</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Email</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Téléphone</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Rôle</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Commandes</th>
                <th className="px-8 py-6 text-left text-gray-400 font-medium">Date d'inscription</th>
                <th className="px-8 py-6 text-center text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr><td colSpan={7} className="text-center py-20 text-gray-400">Chargement des utilisateurs...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-20 text-gray-400">Aucun utilisateur trouvé</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-regal-600 rounded-2xl flex items-center justify-center text-white font-bold">
                          {user.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.full_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-300">{user.email}</td>
                    <td className="px-8 py-6 text-gray-300">{user.phone || '—'}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-4 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.role === 'admin' ? 'Administrateur' : 'Client'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-semibold text-emerald-400">
                        {user.total_orders || 0}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-400 text-sm">
                      {new Date(user.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => toggleUserRole(user.id)}
                          className="p-3 hover:bg-gray-800 rounded-xl text-amber-400 hover:text-amber-300 transition-colors"
                          title="Changer de rôle"
                        >
                          <Shield size={20} />
                        </button>
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-3 hover:bg-gray-800 rounded-xl text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="p-3 hover:bg-gray-800 rounded-xl text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}