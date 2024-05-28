import { AnswerPerQuestionInterface } from "interfaces/QuestionsInterface/AnswerPerQuestion";
import { api_temp } from "../api/Api";

const getAnswerPerQuestion = async (userId: number, formId: number, questionId: number) => {
    try{
        const response = await api_temp.get(`/answer_form?userId=${userId}&formId=${formId}&questionId=${questionId}`,{
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZlbi5zYW50b3NAYm9zY2guY29tIiwiaXNzIjoiQVBJIFJldmlld2VyIiwiaWQiOjIsImV4cCI6MTcxNjkyOTM2N30.O-dP44vSO2XYWxYNyPJpo2THjbG6Zl99YQlgxNbb_gk`
            }
        })
        return response.data
    }catch(error){
        console.error(error)
    }
}

export const AnswerPerQuestionService = {
    getAnswerPerQuestion
}
