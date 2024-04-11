import { SparkButton, SparkTextfield } from "@bosch-web-dds/spark-ui-react";
import { AxiosResponse } from "axios";
import React, { ReactNode } from "react"
import api from "../../api/Api";

import { zodResolver } from '@hookform/resolvers/zod';
import  z  from 'zod' 
import { useForm } from 'react-hook-form'

import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "context/AuthProvider";

const schema = z.object({
    titlePtValue: z.string(),
    titleEnValue: z.string(),
    activeValue: z.boolean().default(true)
});

interface ModalProps{
    id: number,
    titlePtValue: string,
    titleEnValue: string,
    title: string,
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void
}

const ModalAdd:React.FC<ModalProps> = (props: ModalProps) => {

    const id = props.id
    const { accessToken } = useAuth();
    const token = accessToken


    const {
        handleSubmit,
        register,
        formState: { defaultValues },
      } = useForm<ModalProps>({
        defaultValues: { titlePtValue: props.titlePtValue, titleEnValue: props.titleEnValue },
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
      });
    
    
    const showToastMessage = () =>{
        toast.success('Pergunta cadastrada com sucesso!', {
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

    async function updateQuestion(props :ModalProps) {
        try{
            const response: AxiosResponse = await api.post(
                `question`,
                {
                    questionPt: props.titlePtValue,
                    questionEn: props.titleEnValue,
                },{
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );
            showToastMessage()
            setTimeout(()=>{
                window.location.reload()
            }, 1500)
        }catch(error){
            console.log(error)
        }
    }


    return (
        <>{props.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={props.toggle}>
                <div className="flex justify-center items-center bg-black bg-opacity-40 w-full h-full ">
                    <div className="flex bg-boschWhite w-[60%] 2xl:h-[60%] md:h-[75%]" onClick={(e)=>e.stopPropagation()}>
                        {props.children}
                        <div className="w-[80%] h-auto flex flex-col justify-center gap-10 m-auto">
                            <h1 className="text-3xl font-bold">{props.title}</h1>
                            <div className="flex flex-col gap-4">
                                <SparkTextfield {...register('titlePtValue')} label="Português" placeholder="Digite a pergunta em português"/>
                                <SparkTextfield {...register('titleEnValue')}label="Inglês" placeholder="Digite a pergunta em inglês"/>
                            </div>
                            <div className="flex items-end justify-end gap-4">
                                <SparkButton text="Cancelar" pallete="secondary" onClick={(props.toggle)} ></SparkButton>
                                <SparkButton text="Adicionar" onClick={handleSubmit(updateQuestion)}/>
                            </div> 
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
            )}
        </>
    );
  }
  

export default ModalAdd