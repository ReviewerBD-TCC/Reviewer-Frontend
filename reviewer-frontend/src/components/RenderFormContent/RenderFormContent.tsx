import { Selected } from 'components'
import { useQuery } from "react-query";
import { QuestionService } from "services/questionService";
import { useAuth } from "context/AuthProvider";

// componente de bloco de pergunta para a criação do formulario de feedback
export const RenderFormContent = () => {
    const { accessToken } = useAuth();

    const {data: responseList = [], isLoading, error} = useQuery("question", () => {
        console.log(responseList)
        console.log(accessToken)
        return QuestionService.useQuestions(accessToken)
    })

  return (
        <div className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center">
            <div className="w-[95%]">
                <Selected zIndex={25} labelText="Pergunta" options={responseList.map((item: any) => item.questionPt)} />
            </div>
        </div>
    )
}
