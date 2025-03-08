
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Calendar, User, Users } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Meetup {
  id: number;
  title: string;
  location: string;
  time: string;
  date: string;
  description?: string;
  host: {
    id: number;
    name: string;
    specialization: string;
  };
  participants?: { id: number; name: string }[];
}

// Données de test pour les détails d'une rencontre
const mockMeetupDetails: Meetup[] = [
  {
    id: 1,
    title: "Café & Networking pour développeurs",
    location: "Café Tech, Paris",
    time: "14:00",
    date: "15 Juin 2023",
    description: "Une rencontre informelle pour les développeurs de tous niveaux souhaitant échanger sur les dernières technologies et tendances du secteur. Venez avec vos questions et votre expérience à partager !",
    host: {
      id: 101,
      name: "Thomas Martin",
      specialization: "Développeur Full Stack"
    },
    participants: [
      { id: 201, name: "Julie Dubois" },
      { id: 202, name: "Marc Leroy" },
      { id: 203, name: "Sophie Bernard" }
    ]
  },
  {
    id: 2,
    title: "Déjeuner business: Marketing Digital",
    location: "La Cantine, Lyon",
    time: "12:30",
    date: "18 Juin 2023",
    description: "Un déjeuner d'affaires axé sur les stratégies de marketing digital pour petites et moyennes entreprises. Nous discuterons des techniques efficaces de SEO, des campagnes publicitaires sur les réseaux sociaux et de l'analyse de données.",
    host: {
      id: 102,
      name: "Julie Dubois",
      specialization: "Directrice Marketing"
    },
    participants: [
      { id: 204, name: "Alexandre Petit" },
      { id: 205, name: "Claire Moreau" }
    ]
  },
  {
    id: 3,
    title: "Afterwork Startup & Innovation",
    location: "Bar Le Hub, Bordeaux",
    time: "19:00",
    date: "20 Juin 2023",
    description: "Un afterwork convivial pour les entrepreneurs, investisseurs et passionnés d'innovation. Venez partager vos projets, trouver des collaborateurs ou simplement discuter des dernières tendances dans l'écosystème startup.",
    host: {
      id: 103,
      name: "Marc Leroy",
      specialization: "Entrepreneur"
    },
    participants: [
      { id: 206, name: "Thomas Martin" },
      { id: 207, name: "Julie Dubois" },
      { id: 208, name: "Sophie Bernard" },
      { id: 209, name: "Alexandre Petit" }
    ]
  },
  {
    id: 4,
    title: "Meetup Data Science",
    location: "Espace Coworking, Nantes",
    time: "18:30",
    date: "22 Juin 2023",
    description: "Un meetup dédié à la data science et au machine learning. Présentations techniques, études de cas et démonstrations d'outils. Tous les niveaux sont bienvenus, des débutants aux experts.",
    host: {
      id: 104,
      name: "Sophie Bernard",
      specialization: "Data Scientist"
    },
    participants: [
      { id: 210, name: "Marc Leroy" },
      { id: 211, name: "Claire Moreau" }
    ]
  },
  {
    id: 5,
    title: "Petit-déjeuner RH & Recrutement",
    location: "Café Central, Toulouse",
    time: "08:30",
    date: "25 Juin 2023",
    description: "Un petit-déjeuner professionnel pour les acteurs des RH et du recrutement. Nous aborderons les meilleures pratiques d'entretien, l'attraction des talents et les tendances du marché de l'emploi.",
    host: {
      id: 105,
      name: "Alexandre Petit",
      specialization: "Directeur RH"
    },
    participants: []
  },
  {
    id: 6,
    title: "Workshop Design Thinking",
    location: "Studio Créatif, Lille",
    time: "15:00",
    date: "27 Juin 2023",
    description: "Un atelier pratique sur la méthodologie Design Thinking. Apprenez à résoudre des problèmes complexes de manière créative et centrée sur l'utilisateur. Places limitées à 15 participants.",
    host: {
      id: 106,
      name: "Claire Moreau",
      specialization: "UX Designer"
    },
    participants: [
      { id: 212, name: "Thomas Martin" },
      { id: 213, name: "Sophie Bernard" },
      { id: 214, name: "Alexandre Petit" }
    ]
  }
];

const MeetupDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchMeetupDetails = async () => {
      try {
        setIsLoading(true);
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const meetupId = parseInt(id || '0');
        const foundMeetup = mockMeetupDetails.find(m => m.id === meetupId);
        
        if (foundMeetup) {
          setMeetup(foundMeetup);
        } else {
          toast({
            title: "Erreur",
            description: "Rencontre non trouvée.",
            variant: "destructive",
          });
          navigate('/meet');
        }
      } catch (error) {
        console.error("Erreur lors du chargement des détails:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de la rencontre.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetupDetails();
  }, [id, navigate]);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Succès",
        description: "Vous avez rejoint la rencontre avec succès.",
      });
      
      // Mettre à jour l'état local pour refléter que l'utilisateur a rejoint
      if (meetup) {
        setMeetup({
          ...meetup,
          participants: [
            ...(meetup.participants || []),
            { id: 999, name: "Vous" }
          ]
        });
      }
    } catch (error) {
      console.error("Erreur lors de la participation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de rejoindre la rencontre. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!meetup) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Rencontre non trouvée.</p>
          <Button className="mt-4" onClick={() => navigate('/meet')}>
            Retour aux rencontres
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/meet')}
      >
        <ArrowLeft className="mr-2" size={16} />
        Retour aux rencontres
      </Button>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{meetup.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={18} />
                  <span>{meetup.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} />
                  <span>{meetup.date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={18} />
                  <span>{meetup.time}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <User size={18} />
                  <span>Organisé par <strong>{meetup.host.name}</strong></span>
                </div>
                <div className="text-sm text-gray-500">({meetup.host.specialization})</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{meetup.description || "Aucune description disponible."}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={18} />
                <h3 className="text-lg font-medium">Participants ({meetup.participants?.length || 0})</h3>
              </div>
              
              {meetup.participants && meetup.participants.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {meetup.participants.map(participant => (
                    <li key={participant.id} className="text-gray-700 py-1 px-2 rounded bg-gray-50">
                      {participant.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Aucun participant pour le moment. Soyez le premier à rejoindre !</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleJoin} 
              disabled={isJoining}
            >
              {isJoining ? 'En cours...' : 'Rejoindre cette rencontre'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MeetupDetailsPage;
