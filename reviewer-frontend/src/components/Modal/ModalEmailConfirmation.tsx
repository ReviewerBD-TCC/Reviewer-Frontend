import { SparkButton, SparkTextarea, SparkTextfield, SparkToggle } from "@bosch-web-dds/spark-ui-react";
import { AxiosResponse } from "axios";
import React, { ReactNode } from "react"
import api from "../../api/Api";

import { zodResolver } from '@hookform/resolvers/zod';
import  z  from 'zod' 

import { useForm } from 'react-hook-form'

import { useAuth } from "context/AuthProvider";
import useModal from "../../hooks/useModal";

import ModalEmailSelect from "./ModalEmailSelect";

interface ModalProps{
    isOpen: boolean;
    toggle: () => void
}

const ModalEmailConfirmation:React.FC<ModalProps> = (props) => {

    const { accessToken } = useAuth();
    const token = accessToken;

    const {isOpen, toggle} = useModal()

    return (
        <>{props.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={props.toggle}>
                <div className="flex justify-center items-center bg-black bg-opacity-40 w-full h-full ">
                    <div className="flex bg-boschWhite w-[45%] 2xl:h-[40%] md:h-[40%]" onClick={(e)=>e.stopPropagation()}>
                        <div className="w-[80%] h-auto flex flex-col justify-center gap-10 m-auto">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold">Indicação pronta</h1>
                                <p>Selecione os colaboradores a receberem o formulário.</p>
                            </div>
                            <div className="flex items-end justify-end gap-4">
                                <SparkButton text="Enviar para todos" pallete="primary" />
                                <SparkButton text="Selecionar colaboradores" pallete="secondary" onClick={toggle}/>
                                <ModalEmailSelect isOpen={isOpen} toggle={toggle}/>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
  }
  

export default ModalEmailConfirmation