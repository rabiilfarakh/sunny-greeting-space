
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from 'lucide-react';
import CommunityCard from '@/components/community/CommunityCard';
import communityService, { CommunityDTO } from '@/services/communityService';
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const CommunitiesPage = () => {
  const [communities, setCommunities] = useState<CommunityDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setIsLoading(true);
        const response = await communityService.getAllCommunities();
        // Assurez-vous que response.data est un tableau avant de l'affecter
        setCommunities(Array.isArray(response.data) ? response.data : []);
        console.log("Communautés chargées:", response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des communautés:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les communautés.",
          variant: "destructive",
        });
        // En cas d'erreur, définir un tableau vide pour éviter les erreurs
        setCommunities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Filtrer les communautés en fonction de la recherche
  const filteredCommunities = communities.filter(community => 
    community.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (community.description && community.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Communautés</h1>
          <p className="text-gray-600 mt-2">Découvrez et rejoignez des communautés qui correspondent à vos intérêts.</p>
        </div>
        <Link to="/communities/create" className="mt-4 md:mt-0">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Créer une communauté
          </Button>
        </Link>
      </div>

      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Rechercher une communauté..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : filteredCommunities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucune communauté trouvée.</p>
          <Link to="/communities/create">
            <Button className="mt-4">Créer une nouvelle communauté</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommunitiesPage;
