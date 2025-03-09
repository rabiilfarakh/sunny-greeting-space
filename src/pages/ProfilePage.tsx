
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import userService, { UserDTO } from "@/services/userService";

const ProfilePage = () => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserDTO>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user data - in real app, this would use authentication
  // For demo, we'll use a mock user ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Mock user ID for demo - in real app, this would come from auth context
        const mockUserId = 1;
        const response = await userService.getUserById(mockUserId);
        
        // If API doesn't return data yet, use placeholder data
        const userData = response.data || {
          id: 1,
          username: "user1",
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          bio: "Tech enthusiast and developer",
          specialization: "Frontend Development",
          experience: 5,
          skills: ["React", "TypeScript", "UI/UX"],
          location: "Paris"
        };
        
        setUser(userData);
        setFormData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again later.",
          variant: "destructive"
        });
        
        // Set placeholder data for demonstration
        const placeholderData = {
          id: 1,
          username: "user1",
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          bio: "Tech enthusiast and developer",
          specialization: "Frontend Development",
          experience: 5,
          skills: ["React", "TypeScript", "UI/UX"],
          location: "Paris"
        };
        setUser(placeholderData);
        setFormData(placeholderData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsString = e.target.value;
    const skillsArray = skillsString.split(',').map(skill => skill.trim());
    setFormData({
      ...formData,
      skills: skillsArray
    });
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      await userService.updateUser(user.id, formData);
      setUser({...user, ...formData});
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Your profile has been updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
      
      {isLoading && !user ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Chargement du profil...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`} />
                  <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
                <CardDescription className="text-lg">@{user?.username}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{user?.specialization}</p>
                <p className="mb-2">{user?.location}</p>
                <p>{user?.experience} ans d'expérience</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          {/* Right Column - Tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="about" className="flex-1">À propos</TabsTrigger>
                <TabsTrigger value="skills" className="flex-1">Compétences</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Paramètres</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de moi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Prénom</label>
                            <Input 
                              name="firstName"
                              value={formData.firstName || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Nom</label>
                            <Input 
                              name="lastName"
                              value={formData.lastName || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Spécialisation</label>
                          <Input 
                            name="specialization"
                            value={formData.specialization || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Localisation</label>
                          <Input 
                            name="location"
                            value={formData.location || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Années d'expérience</label>
                          <Input 
                            type="number"
                            name="experience"
                            value={formData.experience || 0}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Bio</label>
                          <Textarea 
                            name="bio"
                            value={formData.bio || ''}
                            onChange={handleInputChange}
                            rows={5}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium">Bio</h3>
                          <p className="mt-1 text-muted-foreground">{user?.bio}</p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="mt-1 text-muted-foreground">{user?.email}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Localisation</h3>
                            <p className="mt-1 text-muted-foreground">{user?.location}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {isEditing && (
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={isLoading}>
                        Enregistrer
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes compétences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Compétences (séparées par des virgules)
                        </label>
                        <Input 
                          value={formData.skills?.join(', ') || ''}
                          onChange={handleSkillsChange}
                          placeholder="React, TypeScript, Node.js..."
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user?.skills?.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  {isEditing && (
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={isLoading}>
                        Enregistrer
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres du compte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom d'utilisateur</label>
                          <Input 
                            name="username"
                            value={formData.username || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <Input 
                            name="email"
                            type="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Cliquez sur "Modifier le profil" pour changer vos paramètres de compte.
                      </p>
                    )}
                  </CardContent>
                  {isEditing && (
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={isLoading}>
                        Enregistrer
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
