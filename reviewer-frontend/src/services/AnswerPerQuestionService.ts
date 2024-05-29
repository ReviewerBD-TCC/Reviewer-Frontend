import { api_temp } from "../api/Api";

const getAnswerPerQuestion = async (userId: number, formId: number, questionId: number) => {
    try{
        const response = await api_temp.get(`/answer_form?userId=${userId}&formId=${formId}&questionId=${questionId}`,{
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZlbi5zYW50b3NAYm9zY2guY29tIiwiaXNzIjoiQVBJIFJldmlld2VyIiwiaWQiOjEsImV4cCI6MTcxNzAwNzQ0MX0.eV7QjGaW_-_txR8-DviD3N2smmyf-mblUo_ZpdcLUxc`
            }
        })
        return response.data
    }catch(error){
        console.error(error)
    }
}

const getAnswerPerForm = async (formId: number) => {
    try{
        const response = await api_temp.get(`/answer_form/${formId}`, {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZlbi5zYW50b3NAYm9zY2guY29tIiwiaXNzIjoiQVBJIFJldmlld2VyIiwiaWQiOjEsImV4cCI6MTcxNzAwNzQ0MX0.eV7QjGaW_-_txR8-DviD3N2smmyf-mblUo_ZpdcLUxc`
            }
        })
        return response.data;
    }catch(error){
        console.error(error)
    }
}

export const AnswerPerQuestionService = {
    getAnswerPerQuestion,
    getAnswerPerForm
}
