import { QuestionProps } from "interfaces/Question";
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

async function updateQuestion(token: string | null, id: number, active: boolean) {

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
      console.log(active);
      // window.location.reload()
  }catch(error){
      console.log(error)
  }
}





export const QuestionService = {
  useQuestions, updateQuestion
};
