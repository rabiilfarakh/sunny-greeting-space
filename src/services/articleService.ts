
import api from './api';

export interface ArticleDTO {
  id?: number;
  title: string;
  content: string;
  authorId?: number;
  communityId?: number;
  createdAt?: string;
  updatedAt?: string;
}

const articleService = {
  createArticle: (articleData: ArticleDTO) => api.post('/articles', articleData),
  getArticleById: (id: number) => api.get(`/articles/${id}`),
  getAllArticles: () => api.get('/articles'),
  updateArticle: (id: number, articleData: Partial<ArticleDTO>) => api.patch(`/articles/${id}`, articleData),
  deleteArticle: (id: number) => api.delete(`/articles/${id}`),
};

export default articleService;
