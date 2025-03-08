
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NetUp</h3>
            <p className="text-gray-600">
              La plateforme de networking professionnel qui combine communauté en ligne et rencontres en personne.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Accueil</Link></li>
              <li><Link to="/communities" className="text-gray-600 hover:text-primary">Communautés</Link></li>
              <li><Link to="/articles" className="text-gray-600 hover:text-primary">Articles</Link></li>
              <li><Link to="/meet" className="text-gray-600 hover:text-primary">Rencontres</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: contact@netup.com</li>
              <li className="text-gray-600">Tél: +33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} NetUp. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
