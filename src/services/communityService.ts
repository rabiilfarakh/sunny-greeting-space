
import api from './api';

export interface CommunityDTO {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  createdBy?: number;
  createdAt?: string;
  userId?: number; // Ajouté pour compatibilité avec JSONPlaceholder
  title?: string;  // Ajouté pour compatibilité avec JSONPlaceholder
  body?: string;   // Ajouté pour compatibilité avec JSONPlaceholder
}

// Fonction de mapping pour adapter les données de JSONPlaceholder
const mapCommunityFromApi = (data: any): CommunityDTO => {
  return {
    id: data.id,
    name: data.title || data.name,
    description: data.body || data.description,
    category: data.category || "Général",
    createdBy: data.userId || data.createdBy,
    createdAt: data.createdAt || new Date().toISOString()
  };
};

const communityService = {
  createCommunity: (communityData: CommunityDTO) => {
    // Adapter les données pour JSONPlaceholder si nécessaire
    const apiData = {
      title: communityData.name,
      body: communityData.description,
      userId: communityData.createdBy || 1
    };
    return api.post('/posts', apiData);
  },
  
  getCommunityById: (id: number) => 
    api.get(`/posts/${id}`).then(response => ({
      ...response,
      data: mapCommunityFromApi(response.data)
    })),
  
  getAllCommunities: () => 
    api.get('/posts').then(response => ({
      ...response,
      data: Array.isArray(response.data) 
        ? response.data.map(mapCommunityFromApi).slice(0, 10)  // Limiter à 10 éléments pour l'affichage
        : []
    })),
  
  updateCommunity: (id: number, communityData: Partial<CommunityDTO>) => {
    // Adapter les données pour JSONPlaceholder si nécessaire
    const apiData: any = {};
    if (communityData.name) apiData.title = communityData.name;
    if (communityData.description) apiData.body = communityData.description;
    
    return api.patch(`/posts/${id}`, apiData);
  },
  
  deleteCommunity: (id: number) => api.delete(`/posts/${id}`),
};

export default communityService;
