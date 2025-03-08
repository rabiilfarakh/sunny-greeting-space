
import api from './api';

export interface CommunityDTO {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  createdBy?: number;
  createdAt?: string;
}

const communityService = {
  createCommunity: (communityData: CommunityDTO) => api.post('/communities', communityData),
  getCommunityById: (id: number) => api.get(`/communities/${id}`),
  getAllCommunities: () => api.get('/communities'),
  updateCommunity: (id: number, communityData: Partial<CommunityDTO>) => api.patch(`/communities/${id}`, communityData),
  deleteCommunity: (id: number) => api.delete(`/communities/${id}`),
};

export default communityService;
