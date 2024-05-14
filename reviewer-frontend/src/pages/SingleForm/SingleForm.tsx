import { SparkActivityIndicator, SparkButton } from "@bosch-web-dds/spark-ui-react";
import { Header, Selected } from "components"
import { useAuth } from "context/AuthProvider"
import { QuestionProps } from "interfaces/Question";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { FormService } from "services/FormService";

export const SingleForm = () => {
    const { accessToken, convertToDate } = useAuth();
    const { id } = useParams();
    const [selectedValues, setSelectedValues] = useState<QuestionProps[]>([]);
    const { data: responseFormList = [], isLoading } = useQuery("form", () => {
        return FormService.getFormQuestions(accessToken, id)
    });

    const form = responseFormList.length > 0 ? responseFormList[0] : null;

    let formattedYear = "Data não disponível";
    if (form) {
        const yearDate = convertToDate(form.year);
        if (yearDate) {
            formattedYear = yearDate.toLocaleDateString("pt-BR", { year: "numeric" });
        }
    }
    const handleSelect = (index: number, question: QuestionProps) => {
        setSelectedValues([...selectedValues, question])
        console.log(question)
    }
    return (
        <div className="w-full min-h-screen h-auto flex flex-col items-center">
            <Header />
            <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center p-7">
                <div className="w-[80%] h-auto flex flex-col justify-center items-center gap-10 pt-8 pb-8">
                    <div className="w-full h-12 flex flex-col justify-center">
                        {form && (
                            <>
                                <h1 className="font-bold text-3xl text-start">Feedback do {form.title}</h1>
                                <p>este feedback é referente ao ano de {formattedYear}</p>
                            </>
                        )}
                    </div>

                    <div className="w-full h-auto flex flex-col gap-8 ">
                        {
                            isLoading && <SparkActivityIndicator />
                        }
                        {
                            form && form.questions.map((element: QuestionProps) => (
                                <div className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center">
                                    <div className="w-[95%]">
                                    <Selected
                                        selectedValue={element.questionPt}
                                        setSelectedValue={(newValue: QuestionProps, index: number) =>
                                            handleSelect(index, newValue)
                                        }
                                        zIndex={25}
                                        labelText="Pergunta"
                                        question={form.questions.filter(
                                            (item: any) => item.active
                                        )}
                                    />
                                    </div>
                                   
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-[77%] mb-11 justify-end items-end flex">
            <SparkButton  customWidth="150px" text="Salvar"/>
            </div>
         
        </div>
    );
}
