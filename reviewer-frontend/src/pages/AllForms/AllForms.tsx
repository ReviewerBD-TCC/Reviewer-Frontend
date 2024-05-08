import { Header } from "components"
import { SparkActivityIndicator, SparkNotification } from "@bosch-web-dds/spark-ui-react"
import { useAuth } from "context/AuthProvider";
import { useQuery } from "react-query";
import { AllFormsService } from "services/AllFormsService";
import CardForm from "components/CardForm/CardForm";

export const AllForms = () => {
  const { accessToken } = useAuth();

  const { data: responseFormList = [], isLoading} = useQuery("forms", () => {
    return AllFormsService.getAllForms(accessToken);
  });

  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
      <Header/>
      <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center p-7">
          <div className=" w-[80%] h-auto flex flex-col justify-center items-center gap-8 pt-7 pb-7 pr-1 pl-1">
            
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
                  responseFormList.map((i: any, index: number) =>(
                      <CardForm key={index} link="/home" titleForm={i.title}/>
                    )
                  )
                }
              </div>
          </div>
      </div>
    </div>
  )
}
