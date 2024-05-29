import { api_temp } from "../api/Api";

const getAnswerPerQuestion = async (userId: number, formId: number, questionId: number) => {
    try{
        const response = await api_temp.get(`/answer_form?userId=${userId}&formId=${formId}&questionId=${questionId}`,{
            headers: {
                Authorization: `Bearer `
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
                Authorization: `Bearer `
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
