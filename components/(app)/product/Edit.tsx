import { useEffect, useState } from "react";

export default function EditAdd(){
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
      //  loadProducts(); // Rafraîchir la liste
      };
    
    return (
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
    )
}