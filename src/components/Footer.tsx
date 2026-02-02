import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <span className="font-display font-bold text-xl">
                Mercearia <span className="text-primary">Coimbra</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Sua mercearia de confiança com entrega rápida. 
              Alimentos frescos, bebidas geladas e muito mais.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/categorias" className="hover:text-primary transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="hover:text-primary transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/meus-pedidos" className="hover:text-primary transition-colors">
                  Meus Pedidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@merceariacoimbra.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Rua Exemplo, 123 - Centro<br />São Paulo - SP</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Segunda a Sábado</span>
              </li>
              <li className="pl-6">08:00 - 20:00</li>
              <li className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Domingo</span>
              </li>
              <li className="pl-6">08:00 - 14:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mercearia Coimbra. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
