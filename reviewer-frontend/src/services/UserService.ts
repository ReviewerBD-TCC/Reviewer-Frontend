import { UserData } from "interfaces/UserInterfaces/CreateUser";
import api from "../api/Api";
import { UserLogin } from "../interfaces/UserInterfaces/LoginUser";

const handleLogin = (data: UserLogin) => api.post('/auth/login', data);

const createClient = (data: UserData) => api.post('auth/register', data);

const getUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const userDetails = async () => {
  try {
    const response = await api.get('/users/me');

    return response;
  } catch (error) {
    console.error(error);
  }
}

const saveUserLogged = async () => {
  try {
    const response = await api.post('/user')
    return response.data
  } catch (err) {
    console.error(err)
  }
}

export const UserService = {
  handleLogin, userDetails, getUsers, createClient, saveUserLogged
};