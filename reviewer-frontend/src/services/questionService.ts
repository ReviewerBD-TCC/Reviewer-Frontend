import api from "../api/Api";
import { useQuery } from "react-query";

const useQuestions = async (token: string | null) => {
  try {
    const response = await api.get('/question', {
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

export const QuestionService = {
  useQuestions
};
