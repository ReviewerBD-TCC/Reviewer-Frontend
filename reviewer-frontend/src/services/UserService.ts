import api from "../api/Api";
import { UserLogin } from "../interfaces/LoginUser"; 

const handleLogin = (data: UserLogin) => api.post('/auth/login', data);

const getUsers = async (token: string | null) => {
  try {
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }catch(err){
    console.error(err)
  }
}


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
    handleLogin, userDetails, getUsers
};