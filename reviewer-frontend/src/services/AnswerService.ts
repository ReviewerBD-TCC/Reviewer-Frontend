import { AnswerForm } from "interfaces/SendForm";
import api from "../api/Api";
import { useAuth } from "context/AuthProvider";

const postFormAnswers = async (token: string | null, data: AnswerForm) => {
  try {
    const response = await api.post(`/answer_form`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  }catch(error) {
    throw error
  }
}

export const AnswerService = {
  postFormAnswers
};