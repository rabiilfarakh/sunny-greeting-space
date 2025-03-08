
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CreateMeetPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetup, setMeetup] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeetup(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!meetup.title.trim() || !meetup.location.trim() || !meetup.date.trim() || !meetup.time.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Succès",
        description: "Votre rencontre a été créée avec succès.",
      });
      navigate('/meet');
    } catch (error) {
      console.error("Erreur lors de la création de la rencontre:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la rencontre. Veuillez réessayer.",
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
        onClick={() => navigate('/meet')}
      >
        <ArrowLeft className="mr-2" size={16} />
        Retour aux rencontres
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Organiser une nouvelle rencontre</CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Titre de la rencontre*
              </label>
              <Input
                id="title"
                name="title"
                value={meetup.title}
                onChange={handleChange}
                placeholder="Ex: Café & Networking pour développeurs"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Lieu*
              </label>
              <Input
                id="location"
                name="location"
                value={meetup.location}
                onChange={handleChange}
                placeholder="Ex: Café Tech, Paris"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  Date*
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={meetup.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-1">
                  Heure*
                </label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={meetup.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={meetup.description}
                onChange={handleChange}
                placeholder="Décrivez votre rencontre, son objectif et qui devrait y participer..."
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/meet')}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Création...' : 'Créer la rencontre'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateMeetPage;
