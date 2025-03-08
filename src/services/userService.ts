
import api from './api';

export interface UserDTO {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  specialization?: string;
  experience?: number;
  skills?: string[];
  location?: string;
}

const userService = {
  register: (userData: UserDTO) => api.post('/register', userData),
  getUserById: (id: number) => api.get(`/users/${id}`),
  getUserByUsername: (username: string) => api.get(`/users/profile/${username}`),
  getAllUsers: () => api.get('/users'),
  updateUser: (id: number, userData: Partial<UserDTO>) => api.patch(`/users/${id}`, userData),
  deleteUser: (id: number) => api.delete(`/users/${id}`),
};

export default userService;
