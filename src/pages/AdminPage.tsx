import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingBag, Tags, 
  Plus, Edit, Trash2, Save, X, ArrowLeft
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import type { Category, Product, Order } from '@/types';

// Dashboard Overview
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: productsCount }, { count: ordersCount }, { count: pendingCount }] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);

      setStats({
        products: productsCount || 0,
        orders: ordersCount || 0,
        pending: pendingCount || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border p-6">
          <Package className="w-8 h-8 text-primary mb-2" />
          <p className="text-3xl font-bold">{stats.products}</p>
          <p className="text-muted-foreground">Produtos</p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <ShoppingBag className="w-8 h-8 text-secondary mb-2" />
          <p className="text-3xl font-bold">{stats.orders}</p>
          <p className="text-muted-foreground">Pedidos Total</p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <Tags className="w-8 h-8 text-warning mb-2" />
          <p className="text-3xl font-bold">{stats.pending}</p>
          <p className="text-muted-foreground">Pedidos Pendentes</p>
        </div>
      </div>
    </div>
  );
};

// Products Management
const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category_id: '',
    unit: 'un',
    stock_quantity: '0',
    image_url: '',
    is_available: true,
  });

  const fetchData = async () => {
    setIsLoading(true);
    const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
      supabase.from('products').select('*').order('name'),
      supabase.from('categories').select('*').order('name'),
    ]);
    
    setProducts((productsData || []) as Product[]);
    setCategories((categoriesData || []) as Category[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      category_id: product.category_id || '',
      unit: product.unit,
      stock_quantity: product.stock_quantity.toString(),
      image_url: product.image_url || '',
      is_available: product.is_available,
    });
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      category_id: '',
      unit: 'un',
      stock_quantity: '0',
      image_url: '',
      is_available: true,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      category_id: formData.category_id || null,
      unit: formData.unit,
      stock_quantity: parseInt(formData.stock_quantity),
      image_url: formData.image_url || null,
      is_available: formData.is_available,
    };

    try {
      if (editingProduct) {
        await supabase.from('products').update(productData).eq('id', editingProduct.id);
        toast.success('Produto atualizado!');
      } else {
        await supabase.from('products').insert(productData);
        toast.success('Produto criado!');
      }
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      await supabase.from('products').delete().eq('id', id);
      toast.success('Produto excluído!');
      fetchData();
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  if (showForm) {
    return (
      <div>
        <button onClick={() => setShowForm(false)} className="flex items-center gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <h2 className="text-2xl font-bold mb-6">
          {editingProduct ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <div>
            <Label>Nome</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Preço (R$)</Label>
              <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            </div>
            <div>
              <Label>Preço Original (R$)</Label>
              <Input type="number" step="0.01" value={formData.original_price} onChange={(e) => setFormData({ ...formData, original_price: e.target.value })} placeholder="Opcional" />
            </div>
          </div>
          <div>
            <Label>Categoria</Label>
            <select 
              className="w-full border rounded-md p-2"
              value={formData.category_id} 
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            >
              <option value="">Sem categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Unidade</Label>
              <Input value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} />
            </div>
            <div>
              <Label>Estoque</Label>
              <Input type="number" value={formData.stock_quantity} onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>URL da Imagem</Label>
            <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })} />
            <Label>Disponível para venda</Label>
          </div>
          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 mr-2" /> Salvar
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" /> Novo Produto
        </Button>
      </div>
      
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Preço</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{formatCurrency(product.price)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${product.is_available ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                      {product.is_available ? 'Disponível' : 'Indisponível'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleEdit(product)} className="p-2 hover:bg-muted rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-destructive/10 rounded text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Orders Management
const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    setOrders((data || []) as Order[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await supabase.from('orders').update({ status }).eq('id', orderId);
      toast.success('Status atualizado!');
      fetchOrders();
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const statusOptions = ['pending', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled'];
  const statusLabels: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    preparing: 'Preparando',
    delivering: 'Em Entrega',
    delivered: 'Entregue',
    cancelled: 'Cancelado',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pedidos</h2>
      
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card rounded-xl border p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                </div>
                <p className="font-bold text-primary">{formatCurrency(order.total)}</p>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <select 
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border rounded-md p-2 text-sm"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{statusLabels[status]}</option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                <p className="text-sm text-muted-foreground">{order.delivery_phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Admin Page
const AdminPage = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/produtos', label: 'Produtos', icon: Package },
    { path: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Header */}
      <header className="bg-sidebar text-sidebar-foreground h-16 flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="font-display font-bold text-xl">
            Mercearia <span className="text-primary">Coimbra</span>
          </span>
        </Link>
        <span className="ml-4 px-2 py-1 bg-primary/20 text-primary rounded text-sm font-semibold">
          Admin
        </span>
        <Link to="/" className="ml-auto text-sm hover:text-primary transition-colors">
          ← Voltar para loja
        </Link>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/produtos" element={<AdminProducts />} />
            <Route path="/pedidos" element={<AdminOrders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
