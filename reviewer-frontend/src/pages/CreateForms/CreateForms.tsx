import { SparkButton, SparkDropdown, SparkTextfield } from "@bosch-web-dds/spark-ui-react"
import Header from "../../components/Header/Header"

function CreateForms() {

    const yearsOptions =
     '[{"label":"2024","value":"2024"},{"label":"2025","value":"2025"}]'

     const questionsOptions =
     '[{"label":"O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.","value":"2024"},{"label":"O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.","value":"2025"}]'

  return (
    <>
        <Header/>
        <div className={`bg-[#D0D0D0] w-full overflow-hidden flex justify-center items-center`}>
            <div className="bg-boschWhite w-[90%] h-screen flex items-center justify-center">
                <div className="w-[90%] h-auto flex flex-col gap-9">
                    <h1 className="text-3xl font-bold">Criação de formulário</h1>
                    <div className="flex justify-end">
                        <SparkButton type="button" text="Personalizar"/>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[70%]">
                            <SparkTextfield label="Título do feedback" placeholder="Feedback" />
                        </div>
                        <div className="w-[20%]">
                            <SparkDropdown label="Ano" options={yearsOptions} whenChange={()=>{}}/>
                        </div>
                    </div>

                    <div className="w-full h-[125px] flex justify-center items-center ">
                        <div className="bg-[#F1F1F1] w-[90%] h-full flex justify-center items-center">
                            <SparkDropdown label="Pergunta" options={questionsOptions} whenChange={()=>{}} />
                        </div>
                    </div>
                    
                    <div className="w-full flex justify-between items-center">
                        <SparkButton text="Adicionar pergunta" icon="add"/>
                        <SparkButton text="Finalizar" />
                    </div>
                    <div className="w-full h-auto flex justify-end">
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CreateForms
