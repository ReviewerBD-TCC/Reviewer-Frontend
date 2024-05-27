import axios, { InternalAxiosRequestConfig } from "axios";
import { msalInstance } from "../authSSO/msalInstance";
import { loginRequest } from "../authSSO/authConfig";
import { AuthenticationResult } from "@azure/msal-common";
import { string } from "prop-types";

export const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  "Access-Control-Allow-Origin": "true",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
};
 
//URL em que fazemos as requisições da API
export const API_URL = "http://10.234.81.220:8056/api/v1/"
 

 
//Definindo a instância da URL para as requisições utilizando AXIOS
const instance = axios.create({
  baseURL: API_URL,
});

async function acquireToken(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  console.log("hii")
  try {
    const tokenResponse: AuthenticationResult = await msalInstance.acquireTokenSilent(loginRequest);
    const token = tokenResponse.idToken;

    console.log(token);
    
    config.headers.Authorization = `Bearer ${token}`
   
    return config;
  } catch (error) {
    if (error) {
      // Se ocorrer um erro que requer interação do usuário, redirecione para autenticação interativa
      console.log("deu erro")
      await msalInstance.acquireTokenRedirect(loginRequest);
    } else {
      // Lida com outros erros de forma apropriada
      console.error("Erro ao adquirir token:", error);
      throw error; // Lança o erro para ser tratado pelo chamador
    }
 
    // Retorna o objeto de configuração original para garantir que o encadeamento da solicitação continue
    return config;
  }
}
 
instance.interceptors.request.use(acquireToken);
 
export default instance;