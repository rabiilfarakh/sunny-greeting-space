
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from 'lucide-react';
import articleService, { ArticleDTO } from '@/services/articleService';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [article, setArticle] = useState<Omit<ArticleDTO, 'id'>>({
    title: '',
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!article.title.trim() || !article.content.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await articleService.createArticle(article);
      toast({
        title: "Succès",
        description: "Votre article a été publié avec succès.",
      });
      navigate('/articles');
    } catch (error) {
      console.error("Erreur lors de la publication de l'article:", error);
      toast({
        title: "Erreur",
        description: "Impossible de publier l'article. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/articles')}
      >
        <ArrowLeft className="mr-2" size={16} />
        Retour aux articles
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Rédiger un nouvel article</CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Titre de l'article*
              </label>
              <Input
                id="title"
                name="title"
                value={article.title}
                onChange={handleChange}
                placeholder="Entrez le titre de votre article"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Contenu*
              </label>
              <Textarea
                id="content"
                name="content"
                value={article.content}
                onChange={handleChange}
                placeholder="Rédigez votre article ici..."
                className="min-h-[250px]"
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/articles')}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publication...' : 'Publier l\'article'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateArticlePage;
