import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import type { Category, Product } from '@/types';

interface CategoryPageProps {
  showOffers?: boolean;
}

const CategoryPage = ({ showOffers = false }: CategoryPageProps) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order');
        
        if (categoriesData) {
          setCategories(categoriesData as Category[]);
          
          if (slug) {
            const category = categoriesData.find(c => c.slug === slug);
            setCurrentCategory(category as Category || null);
          } else {
            setCurrentCategory(null);
          }
        }

        // Fetch products based on filters
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_available', true);

        if (slug && categoriesData) {
          const category = categoriesData.find(c => c.slug === slug);
          if (category) {
            query = query.eq('category_id', category.id);
          }
        }

        if (showOffers) {
          query = query.not('original_price', 'is', null);
        }

        if (searchQuery) {
          query = query.ilike('name', `%${searchQuery}%`);
        }

        const { data: productsData } = await query.order('name');

        if (productsData) {
          setProducts(productsData as Product[]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, showOffers, searchQuery]);

  const pageTitle = showOffers 
    ? '🔥 Ofertas' 
    : searchQuery 
    ? `Busca: "${searchQuery}"` 
    : currentCategory 
    ? currentCategory.name 
    : 'Todas as Categorias';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-display font-bold mb-8"
          >
            {pageTitle}
          </motion.h1>

          {/* Categories (only show on main categories page) */}
          {!slug && !showOffers && !searchQuery && (
            <section className="mb-12">
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {categories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Products */}
          <section>
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-xl mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchQuery 
                    ? 'Nenhum produto encontrado para sua busca.' 
                    : 'Nenhum produto disponível nesta categoria.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
