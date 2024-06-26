import { SparkTabNavigationItem } from "@bosch-web-dds/spark-ui/dist/types/components/spark-tab-navigation/spark-tab-navigation";
import {
  SparkSearchBar,
  SparkTabNavigation,
  SparkTextfield,
} from "@bosch-web-dds/spark-ui-react";
import { AnswerPerQuestionService } from "services/AnswerPerQuestionService";
import DashboardCardForm from "components/DashboardCardForm/DashboardCardForm";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { SparkActivityIndicator } from "@bosch-web-dds/spark-ui-react";
import { Header } from "components";
import BackButton from "components/BackButton/BackButton";
import { FormService } from "services/FormService";
import { useEffect, useState } from "react";
import { useAuth } from "context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  useQuery,
} from '@tanstack/react-query'

function Dashboard() {
  const [search, setSearch] = useState("");
  const [usersFormList, setUsersFormList] = useState<FormInterface[]>([]);
  const [formData, setformData] = useState<number>()
  const usersFormListFiltered = [];
  const navigate = useNavigate()

  const { data: responseFormList = [] } = useQuery({
    queryKey: ['forms'],
    queryFn: () => FormService.getAllForms()})

  const getUsersByForm = async (formId: number) => {
    const data = await FormService.getUsersByForms(formId);
    setUsersFormList(data);
    if(tabValue == "1"){
      setTabValue("2")
    }
  };

  const seenNames = new Set();

  for (const user of usersFormList) {
    if (!seenNames.has(user.whichUserName)) {
      usersFormListFiltered.push(user);
      seenNames.add(user.whichUserName);
    }
  }

  const [tabValue, setTabValue] = useState("1");

  const { isLoading ,data: responseAnswerList = [] } = useQuery({
    queryKey: ['answer'],
    queryFn: () => AnswerPerQuestionService.getAnswerByFormId(formData)})

  const { setDashboard } = useAuth();
 
  const filteredUsers = usersFormListFiltered.filter((user: FormInterface) =>
      user.whichUserName.toLowerCase().includes(search.toLowerCase())
  );
  
  useEffect(() => {
    setDashboard(responseAnswerList);
  }, [responseAnswerList])

  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center pt-7">
        <div className=" w-[90%] h-auto flex flex-col justify-center items-center gap-6 pt-7 pb-7">
          <div className="w-full justify-start items-start">
            <BackButton navigateTo="/" />
          </div>
          <div className="w-full h-12 flex items-center">
            <h1 className="font-bold text-3xl text-start w-full">Dashboard</h1>
          </div>
          <div className="flex w-full">
            <SparkTabNavigation
              items={[
                { value: "1", label: "Formulários" },
                {
                  value: "2",
                  label: "Colaborador",
                  disabled: usersFormList.length > 0 ? false : true,
                },
              ]}
              selectedTab={tabValue}
              whenChange={(value: Event, data: SparkTabNavigationItem) => {
                setTabValue(data.value);
              }}
            />
          </div>
          <div className="h-auto justify-center flex flex-col gap-4 w-[95%]">
            {isLoading && <SparkActivityIndicator />}
            {tabValue == "1" ? (
              responseFormList.map((i: FormInterface, index: number) => (
                <DashboardCardForm
                  key={index}
                  id={i.id}
                  titleForm={i.title}
                  className="hover:bg-boschGray/25 cursor-pointer"
                  onClick={() => {
                    setformData(i.id);
                    getUsersByForm(i.id)}}
                />
              ))
            ) : (
              <div className="flex-col w-full flex gap-10 items-start">
                <SparkSearchBar
                  inputs='{"placeholder":"Pesquise sua indicação"}'
                  button-label="Search"
                  whenSearch={(value: any) => setSearch(value)}
                />
                <div className="flex-col w-full h-auto">
                  <div className="flex flex-col gap-2">
                    {filteredUsers?.map((e, index) => (
                      <DashboardCardForm
                        onClick={()=> navigate(`response-dashboard/${e.questionFormId}/${e.forWhichUser}`)}
                        titleForm={e.whichUserName}
                        key={index}
                        className="hover:bg-boschGray/25 cursor-pointer duration-1000 ease-in"
                        id={e.forWhichUser}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
