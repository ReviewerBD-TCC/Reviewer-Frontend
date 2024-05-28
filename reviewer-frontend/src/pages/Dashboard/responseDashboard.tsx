import { AnswerPerQuestionInterface } from "interfaces/QuestionsInterface/AnswerPerQuestion";
import { AnswerPerQuestionService } from "services/AnswerPerQuestionService";
import { SparkAccordion } from "@bosch-web-dds/spark-ui-react";
import BackButton from "components/BackButton/BackButton";
import { FormService } from "services/FormService";
import { useAuth } from "context/AuthProvider";
import { useQuery } from "react-query";
import { Header } from "components";
import { useEffect, useState } from "react";
import { QuestionList } from "interfaces/QuestionsInterface/QuestionList";

function ResponseDashboard() {
  // const { accessToken } = useAuth();
  // função para pegar as questões do formulário
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null); // Track which accordion is currently open

  const { data: responseFormQuestionList = [] } = useQuery("form", () => {
    return FormService.getFormQuestions(1);
  });

  const [questions, setQuestions] = useState<number>(1);

  // função para setar as respostas das perguntas
  const {
    data: responseAnswerList = [],
    isLoading,
    refetch,
  } = useQuery("answer", () => {
    return AnswerPerQuestionService.getAnswerPerQuestion(1, 1, questions);
  });

  useEffect(() => {
    if (typeof questions === "number") {
      refetch();
    }
  }, [questions, refetch]);

  const handleAccordionClick = (questionId: number) => {
    if (openAccordionId === questionId) {
      // Se o mesmo accordion está aberto, feche-o
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(questionId);
      setQuestions(questionId);
    }
  };

  console.log(responseAnswerList);
  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center pt-7">
        <div className=" w-[90%] h-auto flex flex-col justify-center items-center gap-7 pt-7 pb-7">
          <div className="w-full justify-start items-start">
            <BackButton navigateTo="/" />
          </div>
          <div className="w-full h-12 flex flex-col gap-1">
            <h1 className="font-bold text-3xl">
              Formulário de responsabilidade social
            </h1>
            <p>
              Estes são feedbacks referentes a:{" "}
              <span className="font-extrabold text-boschBlue">
                Vitor Alves Costa
              </span>
            </p>
          </div>

          <div className="w-auto h-32 bg-boschTurquoise self-start flex flex-col">
            <p className="font-bold text-lg">Taxa de aderência deste usuário</p>
            <div className="w-6 h-16 bg-boschBlue"></div>
          </div>

          <div className="w-full pt-4">
     
            {responseFormQuestionList[0] &&
              responseFormQuestionList[0].questions.map(
                (element: QuestionList, i: number) => (
                  <SparkAccordion
                    isOp
                    key={i}
                    onClick={() => {
                      setQuestions(element.id);
                    }}
                    headline={element.questionPt}
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
