import { SparkButton, SparkDropdown, SparkTextfield, SparkToggle } from "@bosch-web-dds/spark-ui-react";
import React, { ReactNode } from "react"

interface ModalProps{
    titleValue: string,
    activeValue: boolean,
    title: string,
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void
}

const Modal:React.FC<ModalProps> = (props) => {

    const dropdownOptions =
     '[{"label":"Dissertativa","value":"2"}]'


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
                                <SparkTextfield label="Português" value={props.titleValue} placeholder="Digite a pergunta em português"/>
                                <SparkTextfield label="Inglês" value={props.titleValue} placeholder="Digite a pergunta em inglês"/>
                            </div>
                            <div className="flex items-end justify-end gap-4">
                                <SparkButton text="Cancelar" pallete="secondary" onClick={props.toggle}/>
                                <SparkButton text="Adicionar" onClick={props.toggle}/>
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
