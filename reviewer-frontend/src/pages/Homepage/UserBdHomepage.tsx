import { SparkTabNavigation } from "@bosch-web-dds/spark-ui-react";
import { SparkTabNavigationItem } from "@bosch-web-dds/spark-ui/dist/types/components";
import DashboardCardForm from "components/DashboardCardForm/DashboardCardForm";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { useEffect, useState } from "react";
import { AnswerService } from "services/AnswerService";
import { FormService } from "services/FormService";
import { useMsal } from "@azure/msal-react";
import { IndicationService } from "services/IndicationService";

const userBdHomepage = () => {

    const { instance } = useMsal()

    const account = instance.getActiveAccount();
    console.log(account?.localAccountId)

    const [formList, setFormList] = useState<FormInterface[]>([])

    const [tabValue, setTabValue] = useState("1")

    const [pendingForms, setPendingForms] = useState <FormInterface[]>([])

    const userId = account?.localAccountId

    const getAnswersByUserId = async () => {
        const data = await AnswerService.getAnswerByUserId(userId)
        setFormList(data)
    }
    
    const getAnswersFormPending = async () => {
      const data = await IndicationService.getIndicationFormPending(userId)
      setPendingForms(data)
      console.log(pendingForms)
    }


    return (
    <div className="bg-[#fff] w-[90%] h-full flex flex-col items-center pt-14 gap-2">
        <div className="w-full h-16 flex">
          <h1 className="font-bold text-3xl">Painel do usuário</h1>
        </div>
        <div className='w-full h-auto flex items-center flex- gap-4 bg-boschWhite'>
            <SparkTabNavigation items={[{value:"1", label:"Formulários Pendentes"}, {value:"2", label:"Formulários Respondidos"}]} whenChange={(value:Event, data: SparkTabNavigationItem)=>{setTabValue(data.value)
            }}
            onClick={()=>{
              getAnswersByUserId()
              getAnswersFormPending()
            }}
            />         
        </div>
        <div className="flex flex-col gap-2 w-full">
          {
            tabValue == "1" ? (
              pendingForms.map((item, index)=>( 
                <DashboardCardForm 
                  key={index}
                  id={item.id}
                  titleForm={item.title}
                  onClick={()=>{}}
                />
                ))
          ) : 
      
              [...new Map(formList.map(item => [item.whichUserName, item])).values()]
              .map((i: FormInterface, index: number) => (
                  <DashboardCardForm key={i.id} id={i.id} titleForm={i.whichUserName} />
              ))
          }
        </div>

    </div>
    );
  };

export default userBdHomepage