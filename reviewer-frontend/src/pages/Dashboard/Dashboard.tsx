import { SparkTabNavigation, SparkTextfield } from '@bosch-web-dds/spark-ui-react'
import { Header } from 'components'
import BackButton from 'components/BackButton/BackButton'
import DashboardCardForm from 'components/DashboardCardForm/DashboardCardForm';
import { useQuery } from "react-query";
import { FormService } from "services/FormService";
import { useEffect, useState } from "react";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { useAuth } from 'context/AuthProvider'
import { SparkActivityIndicator } from '@bosch-web-dds/spark-ui-react'
import {  SparkTabNavigationItem } from '@bosch-web-dds/spark-ui/dist/types/components/spark-tab-navigation/spark-tab-navigation';

function Dashboard() {

  const [formData, setFormData] = useState<FormInterface>();
  const [usersFormList, setUsersFormList] = useState<FormInterface[]>([])
  const { accessToken, user, convertToDate } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forms = await FormService.getAllForms(accessToken);
        const currentYear = new Date().getFullYear();
              const currentFormFiltered = forms.find(
                (form: FormInterface) =>
                  convertToDate(form.year)?.getFullYear() === currentYear
              );
      
              setFormData(currentFormFiltered || null);
      
      } catch (error) {
        console.error("Erro ao carregar formulários: ", error);
      }
    };

    fetchData();
  }, [accessToken]);


  const { data: responseFormList = [], isLoading} = useQuery("forms", () => {
    return FormService.getAllForms(accessToken);
  });
  
  const getUsers = async ()=>{
    const data = await FormService.getUsersByForms(accessToken, user.id, formData?.id)
    setUsersFormList(data)
    console.log(usersFormList)
  }

  const usersFormListFiltered = []

  const seenNames = new Set();

  for (const user of usersFormList) {
    if (!seenNames.has(user.whoAnsweredName)) {
      usersFormListFiltered.push(user);
      seenNames.add(user.whoAnsweredName);
    }
  }

  console.log(usersFormListFiltered)

  const [tabValue, setTabValue] = useState("1")
  
    return (
        <div className="w-full min-h-screen h-auto flex flex-col items-center">
          <Header/>
          <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center pt-7">
              <div className=" w-[90%] h-auto flex flex-col justify-center items-center gap-6 pt-7 pb-7">
                  <div className="w-full justify-start items-start">
                    <BackButton navigateTo="/"/>
                  </div>
                  <div className="w-full h-12 flex items-center">
                    <h1 className="font-bold text-3xl text-start w-full">Dashboard</h1>
                  </div>
                  <div className='flex w-[95%]'>
                    <SparkTabNavigation items={[{value:"1", label:"Formulários"}, {value:"2", label:"Colaborador"}]} whenChange={(value:Event, data: SparkTabNavigationItem)=>{setTabValue(data.value)
                    getUsers()}}/>
                  </div>
                  <div className="h-auto flex flex-col gap-4 w-[95%]">
                    {
                      isLoading && <SparkActivityIndicator/>
                    }
                    { tabValue == "1"  ?
                      responseFormList.map((i: FormInterface, index: number) =>(
                          <DashboardCardForm key={index} id={i.id} titleForm={i.title} className="hover:bg-boschGray/25 cursor-pointer" onClick={()=>setFormData(i)}/>
                        )
                      ): 
                        <div className='flex-col w-full flex gap-10 items-start'>
                            <SparkTextfield type='search' placeholder='Nome do colaborador'/>
                        <div className='flex-col w-full h-auto'>
                        {usersFormListFiltered.map((e, index) => (
                          <DashboardCardForm 
                            titleForm={e.whoAnsweredName}
                            key={index} 
                            className="hover:bg-boschGray/25 cursor-pointer"
                          />
                        ))}
                        </div>
                        </div>
                    }
                  </div>
              </div>
          </div>
        </div>
      )
}

export default Dashboard