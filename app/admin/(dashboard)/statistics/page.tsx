// app/(admin)/statistics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, Calendar } from 'lucide-react';

const COLORS = ['#00416A', '#799F0C', '#FFE000', '#10B981'];

export default function AdminStatisticsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Données simulées (à remplacer par des données réelles de ta DB plus tard)
  const salesData = [
    { name: 'Sem 1', ventes: 1240000, commandes: 45 },
    { name: 'Sem 2', ventes: 980000, commandes: 38 },
    { name: 'Sem 3', ventes: 1560000, commandes: 62 },
    { name: 'Sem 4', ventes: 1320000, commandes: 51 },
    { name: 'Sem 5', ventes: 1890000, commandes: 78 },
    { name: 'Sem 6', ventes: 1450000, commandes: 55 },
  ];

  const categoryData = [
    { name: 'Hommes', value: 42, color: '#00416A' },
    { name: 'Femmes', value: 35, color: '#799F0C' },
    { name: 'Enfants', value: 15, color: '#FFE000' },
    { name: 'Accessoires', value: 8, color: '#10B981' },
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 2450000 },
    { month: 'Fév', revenue: 3120000 },
    { month: 'Mar', revenue: 2890000 },
    { month: 'Avr', revenue: 3780000 },
  ];

  const stats = [
    { 
      title: "Chiffre d'affaires", 
      value: "12.4M FCFA", 
      change: "+18.5%", 
      icon: DollarSign, 
      color: "text-emerald-400" 
    },
    { 
      title: "Commandes totales", 
      value: "1,284", 
      change: "+12%", 
      icon: ShoppingCart, 
      color: "text-blue-400" 
    },
    { 
      title: "Clients actifs", 
      value: "892", 
      change: "+7%", 
      icon: Users, 
      color: "text-purple-400" 
    },
    { 
      title: "Taux de conversion", 
      value: "68%", 
      change: "+4.2%", 
      icon: TrendingUp, 
      color: "text-amber-400" 
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Statistiques</h1>
          <p className="text-gray-400 mt-2">Aperçu des performances de votre boutique</p>
        </div>

        <div className="flex gap-2 bg-gray-900 rounded-3xl p-1">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-3 rounded-3xl text-sm font-medium transition-all ${
                period === p 
                  ? 'bg-regal-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
            </button>
          ))}
        </div>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-900 rounded-3xl p-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-4xl font-bold text-white mt-4">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-gray-800 ${stat.color}`}>
                <stat.icon size={32} />
              </div>
            </div>
            <p className="text-emerald-400 text-sm mt-6 flex items-center gap-1">
              <TrendingUp size={16} /> {stat.change} ce mois
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique des ventes */}
        <div className="bg-gray-900 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-white">Évolution des ventes</h3>
            <div className="text-sm text-gray-400">Montant en FCFA</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="natural" 
                  dataKey="ventes" 
                  stroke="#FFE000" 
                  strokeWidth={4}
                  dot={{ fill: '#FFE000', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition par catégorie */}
        <div className="bg-gray-900 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-8">Répartition par catégorie</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {categoryData.map((cat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }} />
                <div>
                  <p className="text-white text-sm">{cat.name}</p>
                  <p className="text-gray-400 text-xs">{cat.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenus mensuels */}
      <div className="bg-gray-900 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold text-white">Revenus mensuels</h3>
          <div className="text-sm text-emerald-400 flex items-center gap-2">
            <TrendingUp size={18} /> +24% par rapport à l'année dernière
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '12px' 
                }} 
              />
              <Bar dataKey="revenue" fill="#799F0C" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}