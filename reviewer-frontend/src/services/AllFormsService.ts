import api from "../api/Api";

export const getAllForms = async (token: string | null) => {
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

export const AllFormsService = { getAllForms };
