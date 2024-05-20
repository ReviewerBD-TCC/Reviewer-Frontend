import api from "../api/Api";

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

const updateQuestion = async (token: string | null, id: number, active: boolean) => {

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
  getQuestions, updateQuestion
};
