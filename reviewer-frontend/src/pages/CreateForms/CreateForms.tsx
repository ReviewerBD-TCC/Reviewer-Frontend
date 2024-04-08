import { SparkActivityIndicator, SparkButton, SparkTextfield } from "@bosch-web-dds/spark-ui-react"
import {Header} from "../../components/Header/Header"
import { Selected } from "../../components/Select/Selected"
import { useQuery } from "react-query";
import { QuestionService } from "services/questionService";
import { useAuth } from "context/AuthProvider";

function CreateForms() {
    const { accessToken } = useAuth();
    
    const {data: responseList = [], isLoading, error} = useQuery("question", () => {
        console.log(responseList)
        console.log(accessToken)
        return QuestionService.useQuestions(accessToken)
    })

    const yearOptions = [2024, 2025, 2026]
    const questionsOptions  = ['O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos. O que essa pessoa já faz, mas poderia estar fazendo mais?','O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.', 'O que essa pessoa já faz, mas poderia estar fazendo mais? Se possível, por gentileza, forneça exemplos.']

    return (
        <div className="h-auto min-h-screen w-full flex flex-col items-center">
            <Header/>
            <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
                <div className="w-[85%] h-auto flex flex-col gap-9 pb-7 pt-7">
                    <div className="w-full h-12 flex items-center">
                        <h1 className="text-3xl font-bold">Criação de formulário</h1>
                    </div>
                    <div className="flex justify-end">
                        {/* <SparkButton type="button" text="Personalizar"/> */}
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[70%]">
                            <SparkTextfield label="Título do feedback" placeholder="Feedback" />
                        </div>
                        <div className="w-[20%]">
                            <Selected zIndex={50} labelText="Ano" options={yearOptions} />
                        </div>
                    </div>
                    <div className="w-full h-auto flex flex-col gap-3 justify-center items-center">
                        
                        <div className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center">
                            <div className="w-[90%]">
                                <Selected zIndex={0} labelText="Pergunta" options={responseList.map(item => item.questionPt)} />
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            {isLoading&&<SparkActivityIndicator/>}
                        </div>

                    </div>
                    
                    <div className="w-full flex justify-between items-center">
                        <SparkButton text="Adicionar pergunta" icon="add"/>
                        <SparkButton text="Finalizar" />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForms
