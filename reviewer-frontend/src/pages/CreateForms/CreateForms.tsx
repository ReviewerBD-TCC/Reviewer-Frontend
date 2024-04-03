import { SparkButton, SparkTextfield } from "@bosch-web-dds/spark-ui-react"
import {Header} from "../../components/Header/Header"
import { Selected } from "../../components/Select/Selected"
import { RenderFormContent } from "components"

function CreateForms() {

    const date: Number = new Date().getFullYear()
    let yearOpcoes = [date]
    // const yearOpcoes = [2024, 2025, 2026]
    const questionsOptions  = ['O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos. O que essa pessoa já faz, mas poderia estar fazendo mais?','O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.']

    return (
        <div className="h-auto min-h-screen w-full flex flex-col">
            <Header/>
            <div className={`bg-[#D0D0D0] w-full h-auto flex justify-center`}>
                <div className="bg-boschWhite w-[90%] h-screen flex items-center justify-center">
                    <div className="w-[85%] h-auto flex flex-col gap-9">
                        <h1 className="text-3xl font-bold">Criação de formulário</h1>
                        <div className="flex justify-end">
                            {/* <SparkButton type="button" text="Personalizar"/> */}
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="w-[70%]">
                                <SparkTextfield label="Título do feedback" placeholder="Feedback" />
                            </div>
                            <div className="w-[20%]">
                                <Selected zIndex={50} labelText="Ano" options={yearOpcoes} />
                                {/* <SparkDropdown label="Ano" options={yearsOptions} whenChange={()=>{}}/> */}
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col gap-3 justify-center items-center">
                            <RenderFormContent />
                        </div>
                        {/* <div className="w-full h-[125px] flex justify-center items-center ">
                            <div className="bg-[#F1F1F1] w-full h-full flex justify-center items-center">
                                <div className="w-[90%]">
                                    <Selected zIndex={25} labelText="Pergunta" options={questionsOptions} />
                                    <SparkDropdown  label="Pergunta" options={questionsOptions} whenChange={()=>{}} />
                                </div>
                            </div>
                        </div> */}
                        
                        <div className="w-full flex justify-between items-center">
                            <SparkButton text="Adicionar pergunta" icon="add"/>
                            <SparkButton text="Finalizar" />
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForms
