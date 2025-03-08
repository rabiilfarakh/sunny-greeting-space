
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Section Hero */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">NetUp - Connectez-vous professionnellement</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Rejoignez notre plateforme qui combine communauté en ligne et rencontres professionnelles en personne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">Créer un compte</Button>
            </Link>
            <Link to="/communities">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Explorer les communautés</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos fonctionnalités principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Communautés Spécialisées</h3>
              <p className="text-gray-600">
                Rejoignez des groupes de professionnels partageant les mêmes intérêts et spécialisations.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <MessageSquare size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Articles & Discussions</h3>
              <p className="text-gray-600">
                Partagez vos connaissances et participez à des discussions avec d'autres experts.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <MapPin size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rencontres Réelles</h3>
              <p className="text-gray-600">
                Organisez ou rejoignez des rencontres en personne basées sur votre localisation et vos intérêts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à développer votre réseau professionnel?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous gratuitement et commencez à connecter avec des professionnels de votre domaine.
          </p>
          <Link to="/register">
            <Button size="lg">Commencer maintenant</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
