
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from 'lucide-react';
import MeetupCard from '@/components/meet/MeetupCard';
import { Link } from 'react-router-dom';

// Données de test pour les rencontres
const mockMeetups = [
  {
    id: 1,
    title: "Café & Networking pour développeurs",
    location: "Café Tech, Paris",
    time: "14:00",
    date: "15 Juin 2023",
    host: {
      id: 101,
      name: "Thomas Martin",
      specialization: "Développeur Full Stack"
    }
  },
  {
    id: 2,
    title: "Déjeuner business: Marketing Digital",
    location: "La Cantine, Lyon",
    time: "12:30",
    date: "18 Juin 2023",
    host: {
      id: 102,
      name: "Julie Dubois",
      specialization: "Directrice Marketing"
    }
  },
  {
    id: 3,
    title: "Afterwork Startup & Innovation",
    location: "Bar Le Hub, Bordeaux",
    time: "19:00",
    date: "20 Juin 2023",
    host: {
      id: 103,
      name: "Marc Leroy",
      specialization: "Entrepreneur"
    }
  },
  {
    id: 4,
    title: "Meetup Data Science",
    location: "Espace Coworking, Nantes",
    time: "18:30",
    date: "22 Juin 2023",
    host: {
      id: 104,
      name: "Sophie Bernard",
      specialization: "Data Scientist"
    }
  },
  {
    id: 5,
    title: "Petit-déjeuner RH & Recrutement",
    location: "Café Central, Toulouse",
    time: "08:30",
    date: "25 Juin 2023",
    host: {
      id: 105,
      name: "Alexandre Petit",
      specialization: "Directeur RH"
    }
  },
  {
    id: 6,
    title: "Workshop Design Thinking",
    location: "Studio Créatif, Lille",
    time: "15:00",
    date: "27 Juin 2023",
    host: {
      id: 106,
      name: "Claire Moreau",
      specialization: "UX Designer"
    }
  }
];

const MeetPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [meetups] = useState(mockMeetups);

  // Filtrer les rencontres en fonction de la recherche
  const filteredMeetups = meetups.filter(meetup => 
    meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meetup.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meetup.host.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Rencontres professionnelles</h1>
          <p className="text-gray-600 mt-2">Trouvez ou organisez des rencontres en personne avec d'autres professionnels.</p>
        </div>
        <Link to="/meet/create" className="mt-4 md:mt-0">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Organiser une rencontre
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Rechercher par titre, lieu ou spécialisation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} />
          Filtres
        </Button>
      </div>

      {filteredMeetups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetups.map(meetup => (
            <MeetupCard key={meetup.id} meetup={meetup} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucune rencontre trouvée avec ces critères.</p>
          <Link to="/meet/create">
            <Button className="mt-4">Organiser une nouvelle rencontre</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MeetPage;
