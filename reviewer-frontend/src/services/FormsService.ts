import api from "../api/Api";
import { useAuth } from "context/AuthProvider";

export const getFormQuestions = async (token: string | null, formId: number | null) => {
    try {
      const response = await api.get(`/form/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
        ,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }