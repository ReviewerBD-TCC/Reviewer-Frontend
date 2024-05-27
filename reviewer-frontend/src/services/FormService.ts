import api from "../api/Api";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { UpdateQuestion } from "interfaces/FormInterfaces/SendForm";


const createForm = async (data: FormInterface) => {
    try {
        const response = await api.post('/form', data);

        return response;
    } catch (error) {
        console.error(error);
    }
}

const getFormQuestions = async (formId: number | null) => {
    try {
        const response = await api.get(`/form/${formId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getAllForms = async () => {
    try {
        const response = await api.get(`/form`)
        return response.data
    }
    catch (error) {
        console.error(error);
    }
}

const deleteForm = async (formId: number) => {
    try {
        const response = await api.delete(`/form/${formId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const editFormQuestion = async (formId: number, data: UpdateQuestion) => {
    try {
        const response = await api.patch(`/form/${formId}`,
            data);
        return response;
    } catch (error) {
        console.error(error);
    }
};


const getFormIndicated = async (token: string | null, id:number) => {
    try {
        const response = await api.get(`/indication_form/user/${id}`, {
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



export const FormService = {
    createForm,
    getFormQuestions,
    getAllForms,
    deleteForm,
    editFormQuestion,
    getFormIndicated
}