
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CommunityDTO } from '@/services/communityService';

interface CommunityCardProps {
  community: CommunityDTO;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{community.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{community.description}</p>
        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <Users size={16} className="mr-1" />
          <span>Catégorie: {community.category || "Non spécifiée"}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/communities/${community.id}`} className="w-full">
          <Button variant="outline" className="w-full">Voir la communauté</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
