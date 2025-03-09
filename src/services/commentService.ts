
import api from './api';

export interface CommentDTO {
  id?: number;
  postId: number;
  name?: string;
  email?: string;
  body: string;
}

const commentService = {
  createComment: (commentData: Omit<CommentDTO, 'id'>) => {
    return api.post('/comments', commentData);
  },
  
  getCommentById: (id: number) => 
    api.get(`/comments/${id}`),
  
  getCommentsByPostId: (postId: number) => 
    api.get(`/comments?postId=${postId}`),
  
  updateComment: (id: number, commentData: Partial<CommentDTO>) => 
    api.patch(`/comments/${id}`, commentData),
  
  deleteComment: (id: number) => 
    api.delete(`/comments/${id}`)
};

export default commentService;
