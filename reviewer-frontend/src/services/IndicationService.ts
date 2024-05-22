import api from "../api/Api";
import { CreateIndication } from "../interfaces/UserInterfaces/CreateIndication";

const createIndication = async (token: string | null, data: CreateIndication) => {
    try{
        const response = await api.post("/indication_form", data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    } catch(error){
        console.error(error);
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
        console.error(error);
    }
}

export const IndicationService = {
    createIndication,
    getUsers
}