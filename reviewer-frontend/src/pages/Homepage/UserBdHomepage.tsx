import { SparkTabNavigation } from "@bosch-web-dds/spark-ui-react";
import { SparkTabNavigationItem } from "@bosch-web-dds/spark-ui/dist/types/components";
import DashboardCardForm from "components/DashboardCardForm/DashboardCardForm";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { useState } from "react";
import { AnswerService } from "services/AnswerService";
import { FormService } from "services/FormService";
import { useMsal } from "@azure/msal-react";

const userBdHomepage = () => {

    const { instance } = useMsal()

    const account = instance.getActiveAccount();

    const [formList, setFormList] = useState([FormService])

    const [tabValue, setTabValue] = useState(1)

    const userId = account?.localAccountId

    const getAnswersByUserId = async () => {
        const data = await AnswerService.getAnswerByUserId(userId)
        setFormList(data)
        console.log(formList)
    }

    return (
    <div className="bg-[#fff] w-[90%] h-full flex flex-col items-center pt-14 ">
        <div className="w-full h-16 flex">
          <h1 className="font-bold text-3xl">Painel do usuário</h1>
        </div>
        <div className='w-full h-auto flex items-center flex- gap-4 bg-boschWhite'>
            <SparkTabNavigation items={[{value:"1", label:"Formulários Pendentes"}, {value:"2", label:"Formulários Respondidos"}]} whenChange={(value:Event, data: SparkTabNavigationItem)=>{setTabValue(data.value)
            getAnswersByUserId()}}
            onClick={()=>getAnswersByUserId()}
            />         
        </div>
        <div>
            {/* {
                tabValue == "1" ? formList.map((i:FormInterface, index: number)=>(
                    <DashboardCardForm key={index} id={i.id} titleForm={i.title}
                ))
            } */}
        </div>
      </div>
    );
  };

export default userBdHomepage