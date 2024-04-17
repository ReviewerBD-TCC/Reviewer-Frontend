import { Selected } from 'components'
import { useQuery } from "react-query";
import { QuestionService } from "services/questionService";
import { useAuth } from "context/AuthProvider";
import { QuestionProps } from 'interfaces/Question';
import { useState } from 'react';

// componente de bloco de pergunta para a criação do formulario de feedback
export const RenderFormContent = () => {
    const { accessToken, listQuestion } = useAuth();

    const { data: responseList = [] } = useQuery("question", () => {
        return QuestionService.useQuestions(accessToken)
    })

    console.log(listQuestion);


    return (
        <div className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center">
            <div className="w-[95%]">
                <Selected disabled={true} zIndex={25} labelText="Pergunta" question={responseList.map((item: QuestionProps) => item)} />
            </div>
        </div>
    )
}
