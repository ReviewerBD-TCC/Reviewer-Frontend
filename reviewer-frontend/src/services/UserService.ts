import api from "../api/Api";
import { UserLogin } from "../interfaces/LoginUser"; 

const handleLogin = (data: UserLogin) => api.post('/auth/login', data);

// const infoClient = async (token) => {
//     try {
//       const response = await Api.get('api/v2/users/me/', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
  
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }

export const UserService = {
  handleLogin
}