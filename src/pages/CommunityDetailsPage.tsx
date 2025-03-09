
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Calendar, MessageSquare } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import communityService, { CommunityDTO } from '@/services/communityService';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CommunityDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const communityId = Number(id);
  
  const [community, setCommunity] = useState<CommunityDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (isNaN(communityId)) {
        toast({
          title: "Erreur",
          description: "ID de communauté invalide.",
          variant: "destructive",
        });
        navigate('/communities');
        return;
      }

      try {
        setIsLoading(true);
        const response = await communityService.getCommunityById(communityId);
        setCommunity(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de la communauté:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la communauté demandée.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunity();
  }, [communityId, navigate]);

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined);
    toast({
      title: isJoined ? "Vous avez quitté la communauté" : "Vous avez rejoint la communauté",
      description: isJoined ? "Vous ne faites plus partie de cette communauté." : "Vous êtes maintenant membre de cette communauté!",
    });
  };

  // Formatage de la date
  const formattedDate = community?.createdAt 
    ? new Date(community.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Date inconnue';

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-48 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600 mb-4">Communauté non trouvée.</p>
        <Button onClick={() => navigate('/communities')}>Retour aux communautés</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/communities')}
        >
          <ArrowLeft className="mr-2" size={16} />
          Retour aux communautés
        </Button>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-lg shadow-md mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">{community.name}</h1>
          <div className="flex items-center mb-2">
            <Users size={16} className="mr-1" />
            <span className="mr-4">Catégorie: {community.category || "Non spécifiée"}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>Créée le {formattedDate}</span>
          </div>
          <Button 
            className={`mt-6 ${isJoined ? 'bg-white text-purple-600' : 'bg-purple-700 hover:bg-purple-800'}`}
            onClick={handleJoinCommunity}
          >
            {isJoined ? 'Quitter la communauté' : 'Rejoindre la communauté'}
          </Button>
        </div>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">À propos de cette communauté</h2>
          <p className="whitespace-pre-line">{community.description || "Aucune description disponible."}</p>
        </div>

        <Separator className="my-8" />

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Discussions récentes</h2>
          
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Aucune discussion pour le moment.</p>
            <p className="text-gray-600 mb-6">Soyez le premier à lancer une conversation dans cette communauté.</p>
            <Button>Démarrer une discussion</Button>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Inviter des membres</h3>
          <div className="flex">
            <Textarea
              placeholder="Entrez les adresses e-mail séparées par des virgules..."
              className="mr-2"
            />
            <Button>Inviter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailsPage;
