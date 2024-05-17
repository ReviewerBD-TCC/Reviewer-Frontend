import { Form } from "interfaces/SendForm";
import api from "../api/Api";

const postFormAnswers = async (token: string | null, data: Form) => {
  try {
    const response = await api.post(`/answer_form`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response
  }catch(error) {
    console.error(error);
  }
}

export const AnswerService = {
  postFormAnswers
};