import { SparkButton, SparkSearchBar, SparkTextarea, SparkTextfield, SparkToggle } from "@bosch-web-dds/spark-ui-react";
import { AxiosResponse } from "axios";
import React, { ReactNode, useEffect, useState, MouseEventHandler } from "react"
import api from "../../api/Api";

import { zodResolver } from '@hookform/resolvers/zod';
import  z, { string }  from 'zod' 

import { useForm } from 'react-hook-form'

import { useAuth } from "context/AuthProvider";
import useModal from "hooks/useModal";

import { TableUser } from "components/Table/Table";

import { SparkNotification } from "@bosch-web-dds/spark-ui-react";

import { IndicationService } from "services/IndicationService";
import { Email } from "interfaces/Emaill";

import { CreateIndication } from "interfaces/CreateIndication";

import { UserIndicatedInterface } from "interfaces/UserIndicated";

import { ToastContainer, Bounce, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { QuestionProps } from "interfaces/Question";

interface ModalProps{
    data:Email;
    isOpen: boolean;
    toggle: () => void;
}

const ModalIndication:React.FC<ModalProps> = (props) => {

    const [search, setSearch] = useState('')

    const showToastMessage = () => {
        toast.success('Colaboradores indicados com sucesso!', {
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

    const { accessToken, selectedUsers, user } = useAuth();
    const navigate = useNavigate()

    const onSubmit: MouseEventHandler<HTMLSparkButtonElement> = async (event) => {
     

        try {
            const indicateds: UserIndicatedInterface[] = selectedUsers.map((userId: QuestionProps) => {

                const eachUser: UserIndicatedInterface = {
                    userIndicated: userId.id
                }
                return eachUser
            }
            );
            const requestData: CreateIndication = {
                userIndication: user.id,
                indicateds: indicateds
            };

            console.log(requestData)
            const { status } = await IndicationService.createIndication(accessToken, requestData);
            console.log(requestData)
            if (status === 201) {
                showToastMessage()
                setTimeout(() => {
                    navigate('/home')
                }, 1500)
            }

        } catch (error) {
            console.error('Erro ao enviar o cliente:', error);
        }

    };
    console.log("modalNIDICATION"+selectedUsers)
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
                                <h1 className="text-3xl font-semibold">Indicação pronta</h1>
                                <SparkNotification type="bar" variant="neutral" icon="info-i">
                                    <p>Selecione os colaboradores a serem indicados.</p>
                                </SparkNotification>
                            </div>
                            <div>
                                <TableUser/>
                            </div>
                            <div className="flex justify-end">
                                <SparkButton text="Enviar" pallete="primary" onClick={()=>onSubmit()} />
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
  

export default ModalIndication