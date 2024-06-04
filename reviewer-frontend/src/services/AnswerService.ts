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

const getAnswerByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/answer_form/user/${userId}`,)
    return response.data
}
catch(error){
    console.error(error)
}
}

const getAnswersFormPending = async (userId: string) => {
  try {
    const response = await api.get(`/answer_form/pending/${userId}`,)
    return response.data
}
catch(error){
    console.error(error)
}
}

export const AnswerService = {
  postFormAnswers,
  getAnswerByUserId,
  getAnswersFormPending
};