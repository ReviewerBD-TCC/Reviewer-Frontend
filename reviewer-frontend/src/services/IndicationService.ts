import api from "../api/Api";
import { CreateIndication } from "../interfaces/UserInterfaces/CreateIndication";

const createIndication = async (data: CreateIndication) => {
    try{
        const response = await api.post("/indication_form", data);

        return response;
    } catch(error){
        console.error(error);
    }
}

const getUsers = async () => {
    try {
        const response = await api.get(`users`);

        return response;
    } catch(error){
        console.error(error);
    }
}

export const IndicationService = {
    createIndication,
    getUsers
}