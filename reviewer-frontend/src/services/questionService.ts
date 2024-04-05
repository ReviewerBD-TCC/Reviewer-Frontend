import api, { headers } from "../api/Api";
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

const updateQuestionStatus = async (token: string | null, id: number | null) => {
  try {
    const currentQuestion = await api.get(`/question/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const currentActiveValue = currentQuestion.data.active;

    let newActiveValue;
    if (currentActiveValue === true) {
      newActiveValue = false;
    } else {
      newActiveValue = true;
    }

    const response = await api.patch(`/question/${id}`, {
      active: newActiveValue
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}




export const QuestionService = {
  useQuestions, updateQuestionStatus
};
