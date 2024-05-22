import { ModalProps } from "interfaces/ModalInterfaces/Modal";
import api from "../api/Api";
import { QuestionProps } from "interfaces/QuestionsInterface/Question";

const getQuestions = async (token: string | null) => {
  try {
    const response = await api.get('/question', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const postQuestion = async (token: string | null, data: ModalProps) => {
  try {
    const response = await api.post('question', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response
  } catch (error) {
    console.error(error)
  }

}

const updateQuestion = async (token: string | null, data: QuestionProps, id: number) => {
  try {
    const response = await api.put(`question/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response
  } catch (err) {
    console.error(err)
  }
}


const updateQuestionActive = async (token: string | null, id: number, active: boolean) => {

  try {
    const response = await api.patch(
      `question/${id}`,
      {
        active: active,
      }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
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
