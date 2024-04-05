import api from "../api/Api";
import { UserLogin } from "../interfaces/LoginUser"; 

const handleLogin = (data: UserLogin) => api.post('/auth/login', data);

const userDetails = async (token: string | null) => {
    try {
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
        ,
      });
  
      return response;
    } catch (error) {
      throw error;
    }
  }

export const UserService = {
    handleLogin, userDetails
};