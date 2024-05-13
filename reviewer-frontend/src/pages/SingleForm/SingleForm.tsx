import { SparkActivityIndicator } from "@bosch-web-dds/spark-ui-react";
import { Header } from "components"
import { useAuth } from "context/AuthProvider"
import { QuestionProps } from "interfaces/Question";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { FormService } from "services/FormService";

export const SingleForm = () => {
    const { accessToken, convertToDate } = useAuth();
    const { id } = useParams();

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

    return (
        <div className="w-full min-h-screen h-auto flex flex-col items-center">
            <Header/>
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
                            isLoading && <SparkActivityIndicator/>
                        }
                        {
                            form && form.questions.map((element: QuestionProps) => (
                                <div className="w-full h-auto flex flex-col gap-1" key={element.id}>
                                    <p><span className="font-bold mr-3 text-black">PT -</span>{element.questionPt}</p>
                                    <p><span className="font-bold mr-3 text-black">EN -</span>{element.questionEn}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
