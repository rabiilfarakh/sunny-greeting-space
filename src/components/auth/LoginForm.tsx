
import React from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const form = useForm<LoginFormValues>();
  
  const onSubmit = (data: LoginFormValues) => {
    // Ici, vous implémenteriez la logique de connexion avec votre API
    console.log("Login submitted:", data);
    
    // Simulation de connexion réussie
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur NetUp!",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>Connectez-vous à votre compte NetUp</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">Se connecter</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Pas encore de compte? <Link to="/register" className="text-primary hover:underline">Inscrivez-vous</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
