
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X } from 'lucide-react';
import articleService, { ArticleDTO } from '@/services/articleService';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [article, setArticle] = useState<Omit<ArticleDTO, 'id'>>({
    title: '',
    content: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
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
      // Dans un environnement réel, nous enverrions également l'image
      // Pour cet exemple, nous ajoutons juste l'article
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
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image de couverture
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={handleImageClick}
                  className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Cliquez pour télécharger une image
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG, GIF jusqu'à 5MB
                  </p>
                </div>
              )}
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
