import { Header } from "components"
import { SparkActivityIndicator, SparkNotification } from "@bosch-web-dds/spark-ui-react"
import { useQuery } from "react-query";
import CardForm from "components/CardForm/CardForm";
import { FormService } from "services/FormService";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { useEffect } from "react";
import BackButton from "components/BackButton/BackButton";

export const AllForms = () => {

  const { data: responseFormList = [], isLoading} = useQuery("forms", () => {
    return FormService.getAllForms();
  });

  useEffect(() => {
    console.log(responseFormList)
  }, [responseFormList])



  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
      <Header/>
      <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center pl-5 pt-7">
          <div className=" w-[90%] h-auto flex flex-col justify-center items-center gap-8 pt-7 pb-7 pr-1 pl-1">
              <div className="w-full justify-start items-start w-auto">
                <BackButton navigateTo="/"/>
              </div>
              <div className="w-full h-12 flex items-center">
                <h1 className="font-bold text-3xl text-start w-full">Formulários de feedback</h1>
              </div>

              <div className="w-[100%] mt-2">
                <SparkNotification  type="bar" variant="neutral" icon="info-i">
                    <p>Estes são todos os formulários criados no sistema.</p>
                </SparkNotification>
              </div>
              
              <div className="w-full h-auto flex flex-col gap-4">
                {
                  isLoading && <SparkActivityIndicator/>
                }
                {
                  responseFormList.map((i: FormInterface, index: number) =>(
                      <CardForm key={index} id={i.id} titleForm={i.title} className="hover:bg-boschGray/25"/>
                    )
                  )
                }
              </div>
          </div>
      </div>
    </div>
  )
}
