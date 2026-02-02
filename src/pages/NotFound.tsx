import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="text-center">
        <span className="text-8xl block mb-4">🛒</span>
        <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Ops! Página não encontrada
        </p>
        <Link to="/">
          <Button className="rounded-full">
            <Home className="w-4 h-4 mr-2" />
            Voltar para Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
