import api from "../api/Api";
import { CreateFormInterface } from "interfaces/CreateForm";


const createForm = async (data: CreateFormInterface, token: string ) => {
    try {
        const response = await api.post('/form', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            ,
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export const FormService = {
    createForm
};