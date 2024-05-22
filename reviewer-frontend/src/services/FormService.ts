import api from "../api/Api";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { UpdateQuestion } from "interfaces/FormInterfaces/SendForm";


const createForm = async (data: FormInterface, token: string) => {
    try {
        const response = await api.post('/form', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            ,
        });

        return response;
    } catch (error) {
        console.error(error);
    }
}

const getFormQuestions = async (token: string | null, formId: number | null) => {
    try {
        const response = await api.get(`/form/${formId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            ,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getAllForms = async (token: string | null) => {
    try {
        const response = await api.get(`/form`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        )
        return response.data
    }
    catch (error) {
        console.error(error);
    }
}

const deleteForm = async (token: string | null, formId: number) => {
    try {
        const response = await api.delete(`/form/${formId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response;
    } catch (error) {
        console.error(error);
    }
}

const editFormQuestion = async (token: string | null, formId: number, data: UpdateQuestion) => {
    try {
        const response = await api.patch(`/form/${formId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};





export const FormService = {
    createForm,
    getFormQuestions,
    getAllForms,
    deleteForm,
    editFormQuestion
}