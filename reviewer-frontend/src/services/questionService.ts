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

async function updateQuestion(token: string | null, id: number) {

  try{
      const response = await api.patch(
          `question/${id}`,
          {
              active: true,
          },{
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          }
      );
      console.log(response.data.question);
      window.location.reload()
  }catch(error){
      console.log(error)
  }
}





export const QuestionService = {
  useQuestions, updateQuestion
};
