import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { UserData } from "interfaces/CreateUser";
import { SubmitHandler } from 'react-hook-form';
import api from "../api/Api";

export const navigate = useNavigate()

export const showToastMessage = () =>{
    toast.success('Usuário cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

const createClient = (data: UserData) => api.post('auth/register', data);

export const onSubmit: SubmitHandler<UserData> = async (values) => {

    try {
      const { status, data } = await createClient(values);
      if (status === 201) {
        console.log('data: ', data)
        showToastMessage()
        setTimeout(()=>{
          navigate('/')
        }, 1500)
      }
    } catch (error) {
      console.error('Erro ao enviar o cliente:', error);
    }
};
