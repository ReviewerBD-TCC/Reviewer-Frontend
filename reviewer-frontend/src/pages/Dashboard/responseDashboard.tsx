import { AnswerPerQuestionInterface } from "interfaces/QuestionsInterface/AnswerPerQuestion";
import { AnswerPerQuestionService } from "services/AnswerPerQuestionService";
import {
  SparkAccordion,
  SparkActivityIndicator,
} from "@bosch-web-dds/spark-ui-react";
import BackButton from "components/BackButton/BackButton";
import { FormService } from "services/FormService";
import { useAuth } from "context/AuthProvider";
import { useQuery } from "react-query";
import { Header, Question } from "components";
import React, { useEffect, useState } from "react";
import { QuestionList } from "interfaces/QuestionsInterface/QuestionList";
import Graphic from "components/Chart/Chart";

function ResponseDashboard() {
  // const { accessToken } = useAuth();
  // const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<number>(1);

  const { data: responseFormQuestionList = [], isLoading } = useQuery(
    "form",
    () => {
      return FormService.getFormQuestions(1);
    }
  );

  const { data: responseAnswerList = [] } = useQuery("answer", () => {
    return AnswerPerQuestionService.getAnswerPerForm(1);
  });

  const chartData:any [] = []

  useEffect(() => {
    if (responseAnswerList) {
     const quantityResp = responseAnswerList.filter((answer: AnswerPerQuestionInterface) =>
      answer.quantityFormSent >= 0)

      const quantityAnsweredForm = responseAnswerList.filter((answer: AnswerPerQuestionInterface) => 
      answer.quantityAnsweredForm >= 0)
      
      chartData.push(quantityResp, quantityAnsweredForm)
    }
    else{
      console.log("Errrrrrrou")
    }
  }, [questions]);

  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center pt-7">
        <div className=" w-[90%] h-auto flex flex-col justify-center items-center gap-6 pt-7 pb-7">
          <div className="w-full justify-start items-start">
            <BackButton navigateTo="/" />
          </div>
          <div className="w-full h-auto flex flex-col gap-2">
            <h1 className="font-bold text-3xl">
              Formulário de responsabilidade social
            </h1>
            <p>
              Estes são feedbacks referentes a: 
              <span className="font-extrabold text-boschBlue pl-1">
                Vitor Alves Santos
              </span>
              .
            </p>
          </div>

          <div className="w-auto h-auto max-h-44 self-start flex flex-col items-center justify-center gap-1 p-1">
            <p className="font-bold text-lg">Taxa de adesão</p>
            <Graphic data={chartData}/>
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
                      // setOpenAccordionId(openAccordionId === element.id ? null : element.id);
                    }}
                    headline={element.questionPt}
                    size="normal"
                    // open={openAccordionId === element.id}
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
