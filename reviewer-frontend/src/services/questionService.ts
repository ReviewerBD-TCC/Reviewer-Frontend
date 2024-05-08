import { useQuestion } from 'context/AuthProvider';
import api, { headers } from "../api/Api";

const useQuestions = async (token: string | null) => {
  try{
    const response = await api.get('/question', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data
  } catch (error){
    console.log(error)
  }
}

const updateQuestion = async (token: string | null, id: number, active: boolean) => {

  try{
      const response = await api.patch(
          `question/${id}`,
          {
              active: active,
          },{
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          }
      );
   
      return response.data
  }catch(error){
      console.log(error)
  }
}





export const QuestionService = {
  useQuestions, updateQuestion
};
