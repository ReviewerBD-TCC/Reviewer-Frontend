import { SparkTabNavigation } from "@bosch-web-dds/spark-ui-react";
import { SparkTabNavigationItem } from "@bosch-web-dds/spark-ui/dist/types/components";
import DashboardCardForm from "components/DashboardCardForm/DashboardCardForm";
import { FormInterface } from "interfaces/FormInterfaces/CreateForm";
import { useState } from "react";
import { AnswerService } from "services/AnswerService";
import { useMsal } from "@azure/msal-react";
import { IndicationService } from "services/IndicationService";
import { useNavigate } from "react-router-dom";

const userBdHomepage = () => {
  const { instance } = useMsal();

  const navigate = useNavigate()

  const account = instance.getActiveAccount();

  const [formList, setFormList] = useState<FormInterface[]>([]);

  const [tabValue, setTabValue] = useState("1");

  const [pendingForms, setPendingForms] = useState<FormInterface[]>([]);

  const userId = account?.localAccountId;

  const getAnswersByUserId = async () => {
    const data = await AnswerService.getAnswerByUserId(userId);
    if (data) setFormList(data);
  };

  const getAnswersFormPending = async () => {
    const data = await IndicationService.getIndicationFormPending(userId);
    if (data) setPendingForms(data);
  };


  return (
    <div className="bg-[#fff] w-[90%] h-full flex flex-col items-center pt-14 gap-2">
      <div className="w-full h-16 flex">
        <h1 className="font-bold text-3xl">Painel do usuário</h1>
      </div>
      <div className="w-full h-auto flex items-center flex- gap-4 bg-boschWhite">
        <SparkTabNavigation
          items={[
            { value: "1", label: "Formulários Pendentes" },
            { value: "2", label: "Formulários Respondidos" },
          ]}
          whenChange={(value: Event, data: SparkTabNavigationItem) => {
            setTabValue(data.value);
          }}
          onClick={() => {
            getAnswersByUserId();
            getAnswersFormPending();
          }}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        {tabValue == "1"
          ? pendingForms.map((item, index) => (
              <div className="">
                <DashboardCardForm
                  key={index}
                  id={item.id}
                  titleForm={item.title}
                  subTitle={item.user.name}
                  onClick={()=>navigate(`/form/${item.id}`)}
                  className="hover:bg-boschGray/25 cursor-pointer"
                />
              </div>
            ))
          : [
              ...new Map(
                formList.map((item) => [item.whichUserName, item])
              ).values(),
            ].map((i: FormInterface, index: number) => (
              <DashboardCardForm
                className="k"
                key={i.id}
                id={i.id}
                titleForm={i.whichUserName}
              />
            ))}
        {(pendingForms.length == 0 && tabValue == "1") ||
        (formList.length == 0 && tabValue == "2") ? (
          <div className="h-auto w-full justify-center flex items-center mt-40">
            <p className="text-2xl text-bold text-boschBlue">
              Ops... Parece que não há formulários.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default userBdHomepage;
