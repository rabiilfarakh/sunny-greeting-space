
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from 'lucide-react';
import ArticleCard from '@/components/article/ArticleCard';
import articleService, { ArticleDTO } from '@/services/articleService';
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const ArticlesPage = () => {
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await articleService.getAllArticles();
        // Assurez-vous que response.data est un tableau avant de l'affecter à articles
        setArticles(Array.isArray(response.data) ? response.data : []);
        console.log("Articles chargés:", response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les articles.",
          variant: "destructive",
        });
        // En cas d'erreur, définir un tableau vide pour éviter les erreurs
        setArticles([]);
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

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  
  // Obtenir les articles pour la page actuelle
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Générer les liens de pagination
  const paginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;
    
    // Pages à afficher (pour gérer les nombreuses pages)
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajuster si on est près du début ou de la fin
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Lien vers la première page si nécessaire
    if (startPage > 1) {
      links.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Ajouter l'ellipse si nécessaire
      if (startPage > 2) {
        links.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Pages principales
    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => handlePageChange(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Lien vers la dernière page si nécessaire
    if (endPage < totalPages) {
      // Ajouter l'ellipse si nécessaire
      if (endPage < totalPages - 1) {
        links.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      links.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  };

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
      ) : currentArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                  )}
                  
                  {paginationLinks()}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
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
