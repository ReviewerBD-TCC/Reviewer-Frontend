import { SparkActivityIndicator } from "@bosch-web-dds/spark-ui-react";
import { Header } from "components"
import { useAuth } from "context/AuthProvider"
import { useQuery } from "react-query";
import { getFormQuestions } from "services/FormsService";

export const SingleForm = () => {
    const { accessToken } = useAuth();

    const { data: responseFormList = [], isLoading } = useQuery("form", () => {
        return getFormQuestions(accessToken, 1)
    })

  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
        <Header/>
        <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center p-7">
            <div className="w-[80%] h-auto flex flex-col justify-center items-center gap-10 pt-8 pb-8">
                <div className="w-full h-12 flex flex-col justify-center">
                    <h1 className="font-bold text-3xl text-start">Feedback dos times de automação</h1>
                    <p>este feedback é referente ao ano de {2024}</p>
                </div>

                <div className="w-full h-auto flex flex-col gap-8 ">
                    {/* <div className="w-full h-auto flex justify-center items-center"></div> */}
                    {
                        isLoading && <SparkActivityIndicator/>
                    }
                    {
                        responseFormList.map((element: any) => (
                            <div className="w-full h-auto flex flex-col gap-1">
                                <p><span className="font-bold mr-3 text-black">PT -</span>{element.questionPt}</p>
                                <p><span className="font-bold mr-3 text-black">EN -</span>{element.questionEn}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
