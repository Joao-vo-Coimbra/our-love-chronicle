import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  
  const cartItem = items.find(item => item.product_id === product.id);
  const quantity = cartItem?.quantity || 0;
  
  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product.id);
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(cartItem.id, quantity + 1);
    } else {
      addItem(product.id);
    }
  };

  const handleDecrement = () => {
    if (cartItem && quantity > 1) {
      updateQuantity(cartItem.id, quantity - 1);
    } else if (cartItem) {
      removeItem(cartItem.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="product-card overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            📦
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="badge-discount">-{discount}%</span>
          )}
          {!product.is_available && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
              Indisponível
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-2">
          {product.unit}
        </p>

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.original_price)}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          {product.is_available ? (
            quantity > 0 ? (
              <div className="flex items-center justify-between bg-muted rounded-full p-1">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-full"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            )
          ) : (
            <Button disabled className="w-full rounded-full" size="sm">
              Indisponível
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
