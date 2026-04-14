// app/(admin)/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Eye } from 'lucide-react';
import { Product } from '@/types';
import { getAllProducts } from '@/lib/data';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Formulaire d'ajout/édition
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image_url: '',
    is_new: false,
    is_promo: false,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setFilteredProducts(data);
    setIsLoading(false);
  };

  // Recherche en temps réel
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description || '',
      category: product.category || '',
      stock: '50', // À améliorer avec vraie donnée
      image_url: product.image_url || '',
      is_new: product.is_new || false,
      is_promo: product.is_promo || false,
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      image_url: '',
      is_new: false,
      is_promo: false,
    });
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu ajouteras la logique d'ajout/édition via Server Action
    alert(editingProduct ? "Produit mis à jour (simulation)" : "Produit ajouté (simulation)");
    setShowAddModal(false);
    resetForm();
    loadProducts(); // Rafraîchir la liste
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    // Ici tu ajouteras la Server Action de suppression
    alert("Produit supprimé (simulation)");
    loadProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white">Gestion des Produits</h1>
          <p className="text-gray-400 mt-2">{filteredProducts.length} produits au total</p>
        </div>

        <Link href={'/admin/product/add'}
          onClick={() => { setShowAddModal(true); resetForm(); }}
          className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-bold px-8 py-4 rounded-3xl transition-all"
        >
          <Plus size={24} />
          Ajouter un produit
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un produit ou une catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 pl-14 py-4 rounded-3xl text-white placeholder-gray-500 focus:outline-none focus:border-regal-500"
        />
      </div>

      {/* Tableau des produits */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-8 py-5 text-left text-gray-400 font-medium">Produit</th>
                <th className="px-8 py-5 text-left text-gray-400 font-medium">Catégorie</th>
                <th className="px-8 py-5 text-left text-gray-400 font-medium">Prix</th>
                <th className="px-8 py-5 text-left text-gray-400 font-medium">Stock</th>
                <th className="px-8 py-5 text-left text-gray-400 font-medium">Statut</th>
                <th className="px-8 py-5 text-center text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-gray-400">Chargement des produits...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-gray-400">Aucun produit trouvé</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-2xl"
                        />
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-300">{product.category}</td>
                    <td className="px-8 py-6 font-semibold text-white">
                      {product.price.toLocaleString('fr-BJ')} FCFA
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-emerald-400 font-medium">En stock</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        {product.is_new && (
                          <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">Nouveau</span>
                        )}
                        {product.is_promo && (
                          <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">Promo</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="p-3 hover:bg-gray-800 rounded-xl text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
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

      {/* Modal Ajout / Édition */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 rounded-3xl w-full max-w-2xl p-10">
            <h2 className="text-3xl font-bold text-white mb-8">
              {editingProduct ? "Modifier le produit" : "Ajouter un nouveau produit"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nom du produit</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Prix (FCFA)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-3xl px-6 py-4 text-white h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-8">
                <label className="flex items-center gap-3 text-white">
                  <input
                    type="checkbox"
                    checked={formData.is_new}
                    onChange={(e) => setFormData({...formData, is_new: e.target.checked})}
                  />
                  Produit Nouveau
                </label>
                <label className="flex items-center gap-3 text-white">
                  <input
                    type="checkbox"
                    checked={formData.is_promo}
                    onChange={(e) => setFormData({...formData, is_promo: e.target.checked})}
                  />
                  En Promotion
                </label>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="flex-1 py-5 border border-gray-700 rounded-3xl text-white font-medium hover:bg-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-5 bg-yellow-500 hover:bg-yellow-400 text-regal-700 font-bold rounded-3xl"
                >
                  {editingProduct ? "Mettre à jour" : "Ajouter le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}