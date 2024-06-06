import { AnswerPerQuestionInterface } from "interfaces/QuestionsInterface/AnswerPerQuestion";
import { SparkAccordion, SparkActivityIndicator } from "@bosch-web-dds/spark-ui-react";
import { AnswerPerQuestionService } from "services/AnswerPerQuestionService";
import { QuestionList } from "interfaces/QuestionsInterface/QuestionList";
import BackButton from "components/BackButton/BackButton";
import { FormService } from "services/FormService";
import { useAuth } from "context/AuthProvider";
import Graphic from "components/Chart/Chart";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { Header } from "components";
import { useParams } from "react-router-dom";

function ResponseDashboard() {
  const { userId, formId } = useParams()
  const { dashboard } = useAuth();
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const [questions, setQuestions] = useState<number>(1);
  const [userName, setUserName] = useState('');

  const { data: responseFormQuestionList = [] } = useQuery({
    queryKey: ['form'],
    queryFn: () => FormService.getFormQuestions(parseInt(formId)
      )
    }
  )

  const { isLoading, data: responseAnswerList = [] } = useQuery({
    queryKey: ['answer'],
    queryFn: () => AnswerPerQuestionService.getAnswerPerForm(parseInt(formId), userId)})

  const chartData: any[] = [];

  const graphResponse = (id: number) => {
    if (dashboard) {
      const array = dashboard.find((subArray: any) => {
        let found = false;
        subArray.forEach((obj: any) => {
          if (obj.id === id) {
            found = true;
          }
        });
        return found;
      });

      if (Array.isArray(array)) {
        const object = array.find((obj: any) => obj.id === id);

        if (object) {
          const quantityAnsweredForm = object.quantityAnsweredForm;
          const quantityFormSent = object.quantityFormSent;

          chartData.push(quantityFormSent * 20, quantityAnsweredForm * 20)
        }
        return chartData
      }
    } else {

    }
    return chartData
  };

  useEffect(() => {
    graphResponse(1);
    if (responseAnswerList.length > 0) {
      setUserName(responseAnswerList[0].whichUserName);
    }
  }, [questions, chartData]);

  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center pt-7">
        <div className=" w-[90%] h-auto flex flex-col justify-center items-center gap-6 pt-7 pb-7">
          <div className="w-full justify-start items-start">
            <BackButton navigateTo="/"/>
          </div>
          <div className="w-full h-auto flex flex-col gap-2">
            <h1 className="font-bold text-3xl">
              Formulário de responsabilidade social
            </h1>
            <p>
              Estes são feedbacks referentes a:
              <span className="font-extrabold text-boschBlue pl-1">
                {userName}
              </span>
              .
            </p>
          </div>

          <div className="w-auto h-auto max-h-44 self-start flex flex-col items-center justify-center gap-1 p-1">
            <p className="font-bold text-lg">Taxa de adesão</p>
            {chartData ? (
              <Graphic data={chartData}/>
            ) : (
              <p>Gráfico indisponível</p>
            )}
          </div>

          <div className="w-full pt-4">
            {isLoading && <SparkActivityIndicator />}
            {responseFormQuestionList[0] &&
              responseFormQuestionList[0].questions.map(
                (element: QuestionList, i: number) => (
                  <SparkAccordion
                    key={i}
                    onClick={() => {
                      setQuestions(element.id);
                    }}
                    headline={element.questionPt}
                    size="normal"
                  >
                    {responseAnswerList
                      .filter(
                        (answer: AnswerPerQuestionInterface) =>
                          answer.question.id === element.id
                      )
                      .map((a: AnswerPerQuestionInterface, index: number) => (
                        <div key={index}>
                          <p className="font-extrabold">{a.whoAnsweredName}</p>
                          <p className="pb-3">{a.answer}</p>
                        </div>
                      ))}
                  </SparkAccordion>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponseDashboard;