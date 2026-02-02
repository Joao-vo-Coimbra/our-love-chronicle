export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  is_available: boolean;
  stock_quantity: number;
  unit: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  total: number;
  delivery_address: string;
  delivery_phone: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'customer';
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  preparing: 'Preparando',
  delivering: 'Em Entrega',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-warning/10 text-warning',
  confirmed: 'bg-primary/10 text-primary',
  preparing: 'bg-secondary/10 text-secondary',
  delivering: 'bg-accent/10 text-accent',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};
