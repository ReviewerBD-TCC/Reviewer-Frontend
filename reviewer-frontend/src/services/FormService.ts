import api from "../api/Api";
import { CreateFormInterface } from "interfaces/CreateForm";

const createForm = (data: CreateFormInterface) => api.post('/form', data);

export const FormService = {
    createForm
};