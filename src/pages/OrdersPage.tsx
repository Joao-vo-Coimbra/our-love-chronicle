import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Order, OrderItem, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<(Order & { items: OrderItem[] })[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersData) {
          // Fetch items for each order
          const ordersWithItems = await Promise.all(
            ordersData.map(async (order) => {
              const { data: itemsData } = await supabase
                .from('order_items')
                .select('*')
                .eq('order_id', order.id);
              
              return {
                ...order,
                items: itemsData || [],
              } as Order & { items: OrderItem[] };
            })
          );

          setOrders(ordersWithItems);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const statusLabels: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    preparing: 'Preparando',
    delivering: 'Em Entrega',
    delivered: 'Entregue',
    cancelled: 'Cancelado',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-warning/10 text-warning',
    confirmed: 'bg-primary/10 text-primary',
    preparing: 'bg-secondary/10 text-secondary',
    delivering: 'bg-accent/10 text-accent',
    delivered: 'bg-accent/10 text-accent',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-display font-bold mb-8"
          >
            📦 Meus Pedidos
          </motion.h1>

          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nenhum pedido ainda</h2>
              <p className="text-muted-foreground">
                Faça seu primeiro pedido e acompanhe aqui!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  {/* Order Header */}
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <p className="font-semibold">
                          Pedido #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                      <span className="font-bold text-primary">
                        {formatCurrency(order.total)}
                      </span>
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Order Details */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-border p-4 bg-muted/30">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Itens</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.product_name}</span>
                                <span>{formatCurrency(item.unit_price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border-t border-border pt-4">
                          <h4 className="font-semibold mb-2">Endereço de Entrega</h4>
                          <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                          <p className="text-sm text-muted-foreground">{order.delivery_phone}</p>
                        </div>

                        {order.notes && (
                          <div>
                            <h4 className="font-semibold mb-2">Observações</h4>
                            <p className="text-sm text-muted-foreground">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
