import { Header } from "components";
import { SparkButton, SparkNotification, SparkActivityIndicator} from "@bosch-web-dds/spark-ui-react"
import { Input } from "components";
import useModal from "../../hooks/useModal";

import Modal from "../../components/Modal/ModalAdd";
import error404 from "../../assets/images/404.png";

import api from "../../api/Api";
import { useQuery } from "react-query";
import { QuestionProps } from "interfaces/Question";
import { QuestionService } from "services/questionService";
import { useAuth } from "context/AuthProvider";
import { UserService } from "services/UserService";

function QuestionDb(props?: QuestionProps) {
  const { isOpen, toggle } = useModal();

  const { accessToken } = useAuth();
  
   

  const { data: responseList = [], isLoading, error } = useQuery("questions", () => {
    console.log(accessToken);
    return QuestionService.useQuestions(accessToken);  
  });


  return (
    <div className="h-auto min-h-screen w-full flex flex-col items-center">
        <Header/>
          <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
            <div className="w-[95%] h-auto flex flex-col justify-center items-center gap-8 pt-7 pb-7">
                
                <div className="2xl:w-[90%] flex flex-col pt-7 pb-7 justify-center items-start gap-3 lg:w-[90%]">
                  <div className="w-full h-12 flex items-center">
                    <h1 className="font-bold text-3xl text-start w-full">Banco de perguntas</h1>
                  </div>

                   
                    <div className="w-[100%]">
                      <SparkNotification type="bar" variant="neutral" icon="info-i">
                          <p>É possível editar estas perguntas.</p>
                      </SparkNotification>
                    </div>
                    <div className="w-[100%] flex flex-col gap-4 ">
                      {
                        responseList.map((t: any, index: number) => (
                          
                          <Input key={t.id} titlePt={t.questionPt} active={t.active} titleEn={t.questionEn} id={t.id} />                        ))
                      }
                      <div className="flex justify-center">
                        {isLoading&&<SparkActivityIndicator/>}
                        {error&&  <img src={error404} alt="GIF 404" />}
                      </div>
                    </div>
                </div>
                <div className="2xl:w-[90%] flex flex-col gap-8 justify-end items-end lg:w-[90%]">
                    <SparkButton text="Adicionar pergunta" customWidth="12rem" onClick={toggle}/>
                    <Modal title="Criação de pergunta" id={props.id} activeValue={props.active} titlePtValue={props.questionPt} titleEnValue={props.questionEn} isOpen={isOpen} toggle={toggle}/>
                </div>
            </div>
          </div>
    </div>
  )
}

export default QuestionDb