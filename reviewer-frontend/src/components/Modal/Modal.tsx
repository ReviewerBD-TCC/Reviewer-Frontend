import { SparkButton, SparkDropdown, SparkToggle } from "@bosch-web-dds/spark-ui-react";
import React, { ReactNode } from "react"
import Input from "../Input/Input";

interface ModalProps{
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void
}

function Modal(props: ModalProps) {
    return (
        <>{props.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={props.toggle}>
                <div className="bg-black bg-opacity-70 w-full h-full">
                    <div className="bg-white w-[60%] h-[60%] rounded" onClick={(e)=>e.stopPropagation()}>
                        {props.children}
                        <h1>Criação da pergunta</h1>
                        <SparkToggle/>
                        <Input/>
                        <Input/>
                        <SparkDropdown whenChange={()=>{}} label="Tipo da questão"/>
                        <div>
                            <SparkButton text="Cancelar" pallete="secondary"/>
                            <SparkButton text="Adicionar"/>
                        </div> 
                    </div>
                </div>
            </div>
            )}
        </>
    );
  }
  

export default Modal
