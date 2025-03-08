
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from 'lucide-react';
import ArticleCard from '@/components/article/ArticleCard';
import articleService, { ArticleDTO } from '@/services/articleService';
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const ArticlesPage = () => {
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await articleService.getAllArticles();
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les articles.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filtrer les articles en fonction de la recherche
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-gray-600 mt-2">Découvrez et partagez des connaissances avec d'autres professionnels.</p>
        </div>
        <Link to="/articles/create" className="mt-4 md:mt-0">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Rédiger un article
          </Button>
        </Link>
      </div>

      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Rechercher un article..."
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
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun article trouvé.</p>
          <Link to="/articles/create">
            <Button className="mt-4">Rédiger un nouvel article</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
