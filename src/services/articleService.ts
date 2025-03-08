
import api from './api';

export interface ArticleDTO {
  id?: number;
  title: string;
  content: string;
  authorId?: number;
  communityId?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: number; // Ajouté pour compatibilité avec JSONPlaceholder
  body?: string;   // Ajouté pour compatibilité avec JSONPlaceholder
}

// Fonction de mapping pour adapter les données de JSONPlaceholder
const mapArticleFromApi = (data: any): ArticleDTO => {
  return {
    id: data.id,
    title: data.title,
    content: data.body || data.content,
    authorId: data.userId || data.authorId,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
};

const articleService = {
  createArticle: (articleData: ArticleDTO) => api.post('/posts', articleData),
  
  getArticleById: (id: number) => 
    api.get(`/posts/${id}`).then(response => ({
      ...response,
      data: mapArticleFromApi(response.data)
    })),
  
  getAllArticles: () => 
    api.get('/posts').then(response => ({
      ...response,
      data: Array.isArray(response.data) 
        ? response.data.map(mapArticleFromApi)
        : []
    })),
  
  updateArticle: (id: number, articleData: Partial<ArticleDTO>) => 
    api.patch(`/posts/${id}`, articleData),
  
  deleteArticle: (id: number) => api.delete(`/posts/${id}`),
};

export default articleService;
