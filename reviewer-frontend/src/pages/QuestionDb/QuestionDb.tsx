import Header from "../../components/Header/Header"
import { SparkButton, SparkNotification} from "@bosch-web-dds/spark-ui-react"
import Input from "../../components/Input/Input"
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/ModalAdd";

import api from "../../services/Api/Api";

import { AxiosResponse } from 'axios'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';
import  z, { string }  from 'zod'
import { useEffect, useState } from "react";


// const schema = z.object({
//     question: z.string(),
//     active: z.boolean().default(true),
// });

// type QuestionProps = z.infer<typeof schema>;

interface QuestionProps{
  questionPt?: string,
  questionEn?: string,
  active?: boolean,
  id?: number,
}

function QuestionDb(props: QuestionProps) {
  const { isOpen, toggle } = useModal();

  const [responseList, setResponseList] = useState<QuestionProps[]>([]);

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<QuestionProps> = await api.get('question', {
          
          headers: {
          'Authorization' : `Bearer ${token}`
        }
      }
        );

        const responseJson = response.data

        setResponseList([]);

        responseJson.forEach((item: any) => {
          console.log(item.id, item.questionPt, item.questionEn, item.active);
          setResponseList(prevState => [
            ...prevState, 
            {id: item.id, questionPt: item.questionPt, questionEn: item.questionEn, active: item.active}
          ])
        });

        
        console.log('responselist', responseList)

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 


  return (
    <div className="h-screen">
        <Header/>
        <div className={`bg-[#D0D0D0] w-full overflow-hidden flex justify-center items-center`}>
          <div className="bg-boschWhite w-[90%] h-screen flex items-center justify-center">
            <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
                <div className="2xl:w-[100%] flex flex-col justify-center items-start gap-2 lg:w-[90%]">
                    <h1 className="font-bold text-4xl text-start w-full ">Banco de perguntas</h1>
                    <div className="w-[100%]">
                      <SparkNotification type="bar" variant="neutral" icon="info-i">
                          <p>Estas são perguntas automáticas, é possível ativa-las ou desativa-las.</p>
                      </SparkNotification>
                    </div>
                    <div className="w-[100%] flex flex-col gap-4 ">
                      {
                        responseList.map((t: any, index: number) => (
                          <Input key={t.id} titlePt={t.questionPt} titleEn={t.questionEn} isActive={t.active} id={t.id} /> 
                        ))
                      }
                    </div>
                </div>
                <div className="2xl:w-[100%] flex flex-col gap-8 justify-end items-end lg:w-[90%]">
                    <SparkButton text="Adicionar pergunta" customWidth="12rem" onClick={toggle}/>
                    <Modal title="Criação de pergunta" id={props.id} activeValue={props.active} titlePtValue={props.questionPt} titleEnValue={props.questionEn} isOpen={isOpen} toggle={toggle}/>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default QuestionDb
