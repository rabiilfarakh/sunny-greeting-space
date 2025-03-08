
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User } from 'lucide-react';

interface MeetupProps {
  id: number;
  title: string;
  location: string;
  time: string;
  date: string;
  host: {
    id: number;
    name: string;
    specialization: string;
  };
}

interface MeetupCardProps {
  meetup: MeetupProps;
}

const MeetupCard: React.FC<MeetupCardProps> = ({ meetup }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{meetup.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={18} />
          <span>{meetup.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={18} />
          <span>{meetup.date} à {meetup.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-700">
          <User size={18} />
          <span>Organisé par <strong>{meetup.host.name}</strong> ({meetup.host.specialization})</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        <Button variant="outline" className="flex-1">Voir détails</Button>
        <Button className="flex-1">Rejoindre</Button>
      </CardFooter>
    </Card>
  );
};

export default MeetupCard;
