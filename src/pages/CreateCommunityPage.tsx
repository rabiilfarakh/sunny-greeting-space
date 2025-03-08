
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import communityService from '@/services/communityService';

// Définir le schéma de validation
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom doit contenir au moins 3 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  category: z.string().min(2, {
    message: "La catégorie doit être spécifiée.",
  }),
});

const CreateCommunityPage = () => {
  const navigate = useNavigate();
  
  // Initialiser le formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await communityService.createCommunity({
        name: values.name,
        description: values.description,
        category: values.category,
        createdAt: new Date().toISOString(),
      });
      
      toast({
        title: "Communauté créée",
        description: "Votre communauté a été créée avec succès.",
      });
      
      // Rediriger vers la page des communautés
      navigate("/communities");
    } catch (error) {
      console.error("Erreur lors de la création de la communauté:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la communauté. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Créer une nouvelle communauté</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la communauté</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le nom de votre communauté" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choisissez un nom représentatif pour votre communauté.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Technologie, Art, Sport..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Catégorisez votre communauté pour faciliter sa découverte.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre communauté en quelques mots..." 
                      {...field} 
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Expliquez le but et les intérêts de votre communauté.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/communities")}
              >
                Annuler
              </Button>
              <Button type="submit">Créer la communauté</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCommunityPage;
