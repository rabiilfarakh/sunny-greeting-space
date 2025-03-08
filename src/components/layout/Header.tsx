
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, MessageSquare, Users, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">NetUp</Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary flex items-center gap-2">
            <Users size={18} />
            Communautés
          </Link>
          <Link to="/articles" className="text-gray-700 hover:text-primary flex items-center gap-2">
            <MessageSquare size={18} />
            Articles
          </Link>
          <Link to="/meet" className="text-gray-700 hover:text-primary flex items-center gap-2">
            <MapPin size={18} />
            Rencontres
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm">Connexion</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Inscription</Button>
          </Link>
          <Link to="/profile" className="p-1 rounded-full hover:bg-gray-100">
            <User size={24} className="text-gray-700" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
