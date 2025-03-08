
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArticleDTO } from '@/services/articleService';

interface ArticleCardProps {
  article: ArticleDTO;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Formatage de la date
  const formattedDate = article.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Date inconnue';
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{article.content}</p>
        <div className="mt-4 text-sm text-gray-500 flex items-center gap-4">
          <span className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {formattedDate}
          </span>
          <span className="flex items-center">
            <MessageSquare size={16} className="mr-1" />
            Commentaires
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/articles/${article.id}`} className="w-full">
          <Button variant="outline" className="w-full">Lire l'article</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
