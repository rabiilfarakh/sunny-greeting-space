
import api from './api';

export interface CommentDTO {
  id?: number;
  content: string;
  authorId?: number;
  articleId?: number;
  createdAt?: string;
}

const commentService = {
  createComment: (commentData: CommentDTO) => api.post('/comments', commentData),
  getCommentById: (id: number) => api.get(`/comments/${id}`),
  getAllComments: () => api.get('/comments'),
  updateComment: (id: number, commentData: Partial<CommentDTO>) => api.put(`/comments/${id}`, commentData),
  deleteComment: (id: number) => api.delete(`/comments/${id}`),
};

export default commentService;
