import { SparkButton, SparkSearchBar, SparkTextarea, SparkTextfield, SparkToggle } from "@bosch-web-dds/spark-ui-react";
import { AxiosResponse } from "axios";
import React, { ReactNode } from "react"
import api from "../../api/Api";

import { zodResolver } from '@hookform/resolvers/zod';
import  z  from 'zod' 

import { useForm } from 'react-hook-form'

import { useAuth } from "context/AuthProvider";
import useModal from "hooks/useModal";

import { TableUser } from "components/Table/Table";

import { SparkNotification } from "@bosch-web-dds/spark-ui-react";


interface ModalProps{
    isOpen: boolean;
    toggle: () => void
}

const ModalEmailSelect:React.FC<ModalProps> = (props) => {

    const { accessToken } = useAuth();
    const token = accessToken

    return (
        <>{props.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={props.toggle}>
                <div className="flex justify-center items-center bg-black bg-opacity-40 w-full h-full ">
                    <div className="flex bg-boschWhite 2xl:h-[70%] md:h-[90%] md:w-[50%] flex-col" onClick={(e)=>e.stopPropagation()}>
                    <div className="border-b-black border-y-2 border-t-transparent  items-start p-1">
                         <p className="flexpl-3 font-bold">Disparo de indicações</p>
                    </div>
                        <div className="w-[95%] h-auto flex flex-col justify-center gap-14 m-auto">
                           
                            <div className="flex flex-col gap-2 ">

                                <h1 className="text-3xl font-bold">Indicação pronta</h1>
                                <SparkNotification type="bar" variant="neutral" icon="info-i">
                                    <p>Selecione os colaboradores a receberem o formulário de indicação</p>
                                </SparkNotification>
                                <SparkTextfield type="search" placeholder="Digite o nome do colaborador."/>

                            </div>
                            <div className="">
                                <TableUser/>
                            </div>
                            <div className="flex justify-end">
                                <SparkButton text="Enviar" pallete="primary" />
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
  }
  

export default ModalEmailSelect