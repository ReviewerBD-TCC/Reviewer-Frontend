import api, { headers } from "../api/Api";
import { CreateFormInterface } from "interfaces/CreateForm";
import { FormInterface } from "interfaces/CreateForm";
import { updateQuestion } from "interfaces/SendForm";


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
      throw error;
    }
}

const getAllForms = async (token: string | null) => {
  try{
      const response = await api.get(`/form`, {
          headers:{
              Authorization: `Bearer ${token}`
          },
      }
      )
      return response.data
  }
  catch(error){
      throw(error)
  }
}

const deleteForm = async (token: string | null, formId: number | any, data: updateQuestion) => {
    try {
        const response = await api.delete(`/form/${formId}`,
         {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw(error);
    }
}

const editFormQuestion = async (token: string | null, formId: number | any, data: updateQuestion) => {
    try{
        const response = await api.patch(`/form/${formId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        return response;
    } catch(error){
        throw(error);
    }
}




export const FormService = {
    createForm,
    getFormQuestions,
    getAllForms,
    deleteForm,
    editFormQuestion
};