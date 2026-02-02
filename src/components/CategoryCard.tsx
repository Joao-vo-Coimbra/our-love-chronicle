import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBasket, Wine, Apple, Croissant, Beef, Milk, 
  Sparkles, Heart, Pill, Dog, Package 
} from 'lucide-react';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBasket,
  Wine,
  Apple,
  Croissant,
  Beef,
  Milk,
  Sparkles,
  Heart,
  Pill,
  Dog,
  Package,
};

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  const IconComponent = category.icon && iconMap[category.icon] 
    ? iconMap[category.icon] 
    : Package;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/categoria/${category.slug}`}
        className="category-card block group"
      >
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {category.image_url ? (
            <img
              src={category.image_url}
              alt={category.name}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <IconComponent className="w-8 h-8 text-primary" />
          )}
        </div>
        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
