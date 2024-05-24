import {
  SparkButton,
  SparkNotification,
  SparkActivityIndicator,
} from "@bosch-web-dds/spark-ui-react";
import { QuestionService } from "services/QuestionService";
import error404 from "../../assets/images/404.png";
import useModal from "../../hooks/useModal";
import { useQuery } from "react-query";
import { Header, Modal } from "components";
import { Input } from "components";
import BackButton from "components/BackButton/BackButton";
import { ModalProps } from "interfaces/ModalInterfaces/Modal";

function QuestionDb() {
  const { isOpen, toggle } = useModal();

  const {
    data: responseList = [],
    isLoading,
    error,
  } = useQuery("questions", () => {
  
    return QuestionService.getQuestions();
  });

  return (
    <div className="h-auto min-h-screen w-full flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-full h-auto flex items-center justify-center">
        <div className="w-full h-auto flex flex-col justify-center items-center gap-8 pt-7 pb-7 pl-7">
          <div className="flex flex-col pt-7 pb-7 justify-center items-start gap-4 lg:w-[90%]">
            <div className="">
              <BackButton navigateTo="/" />
            </div>
            <div className="w-full h-12 flex items-center">
              <h1 className="font-bold text-3xl text-start w-full">
                Banco de perguntas
              </h1>
            </div>
            <div className="w-[100%] my-4">
              <SparkNotification type="bar" variant="neutral" icon="info-i">
                <p>É possível editar estas perguntas.</p>
              </SparkNotification>
            </div>
            <div className="w-[100%] flex flex-col gap-3">
              {responseList.map((question: ModalProps) => (
                <Input
                  key={question.id}
                  titlePt={question.questionPt}
                  active={question.active}
                  titleEn={question.questionEn}
                  id={question.id}
                  className="mt-1 cursor-pointer"
                />
              ))}
              <div className="flex justify-center">
                {isLoading && <SparkActivityIndicator />}
                {error && <img src={error404} alt="GIF 404" />}
              </div>
            </div>
          </div>
          <div className="2xl:w-[90%] flex flex-col gap-8 justify-end items-end lg:w-[90%]">
            <SparkButton
              text="Adicionar pergunta"
              customWidth="12rem"
              onClick={toggle}
            />
            <Modal title="Criação de pergunta" isOpen={isOpen} toggle={toggle}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDb;
