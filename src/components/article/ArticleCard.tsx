
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArticleDTO } from '@/services/articleService';

interface ArticleCardProps {
  article: ArticleDTO;
}

// Images placeholder pour les articles
const articleImages = [
  "/placeholder.svg",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop"
];

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Formatage de la date
  const formattedDate = article.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Date inconnue';
  
  // Sélectionner une image en fonction de l'ID de l'article
  const imageIndex = article.id ? (article.id % articleImages.length) : 0;
  const imageUrl = articleImages[imageIndex];
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{article.title}</CardTitle>
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
