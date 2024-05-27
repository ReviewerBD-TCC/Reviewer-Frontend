import { ModalProps } from "interfaces/ModalInterfaces/Modal";
import api from "../api/Api";
import { QuestionProps } from "interfaces/QuestionsInterface/Question";

const getQuestions = async () => {
  try {
    const response = await api.get('/question');
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const postQuestion = async (data: ModalProps) => {
  try {
    const response = await api.post('question', data);
    return response
  } catch (error) {
    console.error(error)
  }

}

const updateQuestion = async (data: QuestionProps, id: number) => {
  try {
    const response = await api.put(`question/${id}`, data);
    return response
  } catch (err) {
    console.error(err)
  }
}


const updateQuestionActive = async (id: number, active: boolean) => {

  try {
    const response = await api.patch(
      `question/${id}`,
      {
        active: active,
      }, 
    );

    return response.data
  } catch (error) {
    console.error(error)
  }
}



export const QuestionService = {
  getQuestions,
  updateQuestion,
  updateQuestionActive,
  postQuestion
};
