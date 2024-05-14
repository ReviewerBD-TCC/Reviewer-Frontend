import { SparkButton, SparkTextarea, SparkTextfield, SparkToggle } from "@bosch-web-dds/spark-ui-react";
import { AxiosResponse } from "axios";
import React, { ReactNode, useContext, useState } from "react"
import api from "../../api/Api";

import { zodResolver } from '@hookform/resolvers/zod';
import  z  from 'zod' 

import { useForm } from 'react-hook-form'

import { useAuth, useQuestion } from "context/AuthProvider";

import { ToastContainer, Bounce, toast } from "react-toastify";


const schema = z.object({
    titlePtValue: z.string(),
    titleEnValue: z.string(),
    active: z.boolean().default(true)
  });

interface ModalProps{
    id: number,
    titlePtValue: string,
    titleEnValue: string,
    active: boolean,
    title: string,
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void
}

const Modal:React.FC<ModalProps> = (props) => {

    const id = props.id

    const { accessToken,  setActiveValue } = useAuth();
    const [active, setActive] = useState<boolean>(props.active);


    
    const token = accessToken
   


    // const dropdownOptions =
    //  '[{"label":"Dissertativa","value":"2"}]'

    const showToastMessage = () => {
        toast.success('Pergunta foi editada com sucesso!', {
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
    const showToastMessageError400 = () => {
        toast.warning('Por favor preencha os campos corretamente!', {
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

    const {
        handleSubmit,
        register,
        formState: { defaultValues },
      } = useForm<ModalProps>({
        defaultValues: { titlePtValue: props.titlePtValue, titleEnValue: props.titleEnValue, active: active },
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
      });
    
    async function updateQuestion(props :ModalProps) {
        // console.log("setouuu", active)
        try{
            const response: AxiosResponse = await api.put(
                `question/${id}`,
                {
                    questionPt: props.titlePtValue,
                    questionEn: props.titleEnValue,
                    active: active,
                },{
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );
            console.log(response.data.question);
            showToastMessage()
            setTimeout(() => {
            console.log(accessToken)
            window.location.reload()
            }, 1000)
        }catch(error){
            if(error.response.status === 400){
                showToastMessageError400()
            }
        }
    }
    // console.log(active)

    return (
        <>{props.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={props.toggle}>
                <div className="flex justify-center items-center bg-black bg-opacity-40 w-full h-full ">
                    <div className="flex bg-boschWhite w-[60%] 2xl:h-[60%] md:h-[75%]" onClick={(e)=>e.stopPropagation()}>
                        {props.children}
                        <div className="w-[80%] h-auto flex flex-col justify-center gap-10 m-auto">
                            <h1 className="text-3xl font-bold">{props.title}</h1>
                            <div className="flex justify-end items-end"> 
                                <SparkToggle onClick={()=>{}} whenChange={()=>{setActive(!active)}} leftLabel="Pergunta ativa" guid="spark-toggle-right-label" selected={active}/>
                            </div>
                            <div className="flex flex-col gap-4">
                                <SparkTextfield {...register('titlePtValue')} label="Português" defaultValue={props.titlePtValue} placeholder="Digite a pergunta em português"/>
                                <SparkTextfield {...register('titleEnValue')}label="Inglês" value={props.titleEnValue} placeholder="Digite a pergunta em inglês"/>
                            </div>
                            <div className="flex items-end justify-end gap-4">
                                <SparkButton text="Cancelar" pallete="secondary" onClick={(props.toggle)} ></SparkButton>
                                <SparkButton text="Salvar" onClick={handleSubmit(updateQuestion)}/>
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
  

export default Modal