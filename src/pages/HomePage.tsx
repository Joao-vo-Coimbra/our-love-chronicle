import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Clock, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import type { Category, Product } from '@/types';

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order');
        
        if (categoriesData) {
          setCategories(categoriesData as Category[]);
        }

        // Fetch featured products (products with discount)
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .eq('is_available', true)
          .not('original_price', 'is', null)
          .limit(8);

        if (productsData) {
          setFeaturedProducts(productsData as Product[]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Entregamos em até 2 horas',
    },
    {
      icon: Clock,
      title: 'Aberto Todo Dia',
      description: 'Seg a Sáb 8h-20h, Dom 8h-14h',
    },
    {
      icon: ShieldCheck,
      title: 'Qualidade Garantida',
      description: 'Produtos sempre frescos',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4"
              >
                Sua compra na porta de casa,{' '}
                <span className="text-primary">rapidinho!</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-6"
              >
                Alimentos, bebidas, farmácia, limpeza e muito mais. 
                Faça seu pedido online e receba em casa com toda comodidade.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/categorias">
                  <Button size="lg" className="rounded-full">
                    Ver Produtos
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Categorias</h2>
              <Link to="/categorias" className="text-primary font-semibold hover:underline">
                Ver todas
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-muted" />
                    <div className="h-4 bg-muted rounded mx-auto w-20" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {categories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">🔥 Ofertas</h2>
                <Link to="/ofertas" className="text-primary font-semibold hover:underline">
                  Ver todas
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Pronto para fazer seu pedido?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Cadastre-se agora e aproveite as melhores ofertas da região!
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="rounded-full">
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
