
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, MessageSquare } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import articleService, { ArticleDTO } from '@/services/articleService';
import commentService, { CommentDTO } from '@/services/commentService';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Images placeholder pour les articles
const articleImages = [
  "/placeholder.svg",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop"
];

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleId = Number(id);
  
  const [article, setArticle] = useState<ArticleDTO | null>(null);
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      if (isNaN(articleId)) {
        toast({
          title: "Erreur",
          description: "ID d'article invalide.",
          variant: "destructive",
        });
        navigate('/articles');
        return;
      }

      try {
        setIsLoading(true);
        // Charger l'article
        const articleResponse = await articleService.getArticleById(articleId);
        setArticle(articleResponse.data);

        // Charger les commentaires
        const commentsResponse = await commentService.getCommentsByPostId(articleId);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger l'article demandé.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleAndComments();
  }, [articleId, navigate]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        title: "Erreur",
        description: "Le commentaire ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const comment: Omit<CommentDTO, 'id'> = {
        postId: articleId,
        body: newComment,
        name: "Utilisateur",
        email: "user@example.com"
      };
      
      const response = await commentService.createComment(comment);
      setComments([...comments, response.data]);
      setNewComment('');
      toast({
        title: "Succès",
        description: "Votre commentaire a été publié.",
      });
    } catch (error) {
      console.error("Erreur lors de la publication du commentaire:", error);
      toast({
        title: "Erreur",
        description: "Impossible de publier votre commentaire.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sélectionner une image en fonction de l'ID de l'article
  const imageIndex = article?.id ? (article.id % articleImages.length) : 0;
  const imageUrl = articleImages[imageIndex];

  // Formatage de la date
  const formattedDate = article?.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Date inconnue';

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600 mb-4">Article non trouvé.</p>
        <Button onClick={() => navigate('/articles')}>Retour aux articles</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/articles')}
        >
          <ArrowLeft className="mr-2" size={16} />
          Retour aux articles
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <User size={16} className="mr-1" />
            <span className="mr-4">Auteur</span>
            <Calendar size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden mb-8">
          <img 
            src={imageUrl} 
            alt={article.title} 
            className="w-full h-auto object-cover max-h-96"
          />
        </div>

        <div className="prose max-w-none mb-12">
          <p className="whitespace-pre-line">{article.content}</p>
        </div>

        <Separator className="my-8" />

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <MessageSquare size={20} className="mr-2" />
            Commentaires ({comments.length})
          </h2>

          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id} className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start mb-2">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback>{comment.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{comment.name || 'Utilisateur'}</p>
                        <p className="text-sm text-gray-500">{comment.email || ''}</p>
                      </div>
                    </div>
                    <p className="mt-2">{comment.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Aucun commentaire pour l'instant. Soyez le premier à réagir!</p>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Laisser un commentaire</h3>
          <form onSubmit={handleSubmitComment}>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partagez votre avis..."
              className="mb-4 min-h-[100px]"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? 'Publication...' : 'Publier mon commentaire'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
