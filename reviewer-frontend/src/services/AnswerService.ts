import { Form } from "interfaces/FormInterfaces/SendForm";
import api from "../api/Api";

const postFormAnswers = async (data: Form) => {
  try {
    const response = await api.post(`/answer_form`, data);
    return response
  }catch(error) {
    console.error(error);
  }
}

export const AnswerService = {
  postFormAnswers
};