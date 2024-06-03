import api from "../api/Api";

const getAnswerPerQuestion = async (userId: number, formId: number, questionId: number) => {
    try{
        const response = await api.get(`/answer_form?userId=${userId}&formId=${formId}&questionId=${questionId}`)
        return response.data
    }
    catch(error){
        console.error(error)
    }
}

const getAnswerPerForm = async (formId: number, user: string) => {
    try{
        const response = await api.get(`/answer_form/user/${user}/?formId=${formId}`)
        return response.data;
    }catch(error){
        console.error(error)
    }
}

export const AnswerPerQuestionService = {
    getAnswerPerQuestion,
    getAnswerPerForm
}
