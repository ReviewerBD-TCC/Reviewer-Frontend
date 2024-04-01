import api from "../api/Api";
import { CreateIndication } from "../interfaces/CreateIndication";

const createIndication = async (token: string | null, data: CreateIndication) => {
    try{
        const response = await api.post("/indication_form", data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    } catch(error){
        throw error;
    }
}

const getUsers = async (token: string | null) => {
    try {
        const response = await api.get(`users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch(error){
        throw error;
    }
}

export const IndicationService = {
    createIndication,
    getUsers
}