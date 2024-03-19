import { SparkButton, SparkTextfield, SparkToggle } from "@bosch-web-dds/spark-ui-react";
import { AxiosResponse } from "axios";
import React, { ReactNode } from "react"
import api from "../../services/Api/Api";

import { zodResolver } from '@hookform/resolvers/zod';
import  z  from 'zod' 

import { useForm } from 'react-hook-form'

const schema = z.object({
    titlePtValue: z.string(),
    titleEnValue: z.string(),
    activeValue: z.boolean().default(true)
  });

interface ModalProps{
    id: number,
    titlePtValue: string,
    titleEnValue: string,
    activeValue: boolean,
    title: string,
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void
}

const Modal:React.FC<ModalProps> = (props) => {

    const id = props.id

    const token = localStorage.getItem('token')

    // const dropdownOptions =
    //  '[{"label":"Dissertativa","value":"2"}]'

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
    
    

    async function updateQuestion(props :ModalProps) {
        try{
            const response: AxiosResponse = await api.post(
                `question`,
                {
                    questionPt: props.titlePtValue,
                    questionEn: props.titleEnValue,
                    active: props.activeValue,
                },{
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );
            console.log(response.data.question);
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
                            <div className="flex justify-end items-end">
                                <SparkToggle whenChange={()=>{}} leftLabel="Pergunta ativa" guid="spark-toggle-right-label" selected={props.activeValue}/>
                            </div>
                            <div className="flex flex-col gap-4">
                                <SparkTextfield {...register('titlePtValue')} label="Português" value={props.titlePtValue} placeholder="Digite a pergunta em português"/>
                                <SparkTextfield {...register('titleEnValue')}label="Inglês" value={props.titleEnValue} placeholder="Digite a pergunta em inglês"/>
                            </div>
                            <div className="flex items-end justify-end gap-4">
                                <SparkButton text="Adicionar" onClick={handleSubmit(updateQuestion)}/>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
  }
  

export default Modal
