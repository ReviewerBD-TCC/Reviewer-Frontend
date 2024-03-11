import Header from "../../components/Header/Header"
import { SparkButton, SparkNotification} from "@bosch-web-dds/spark-ui-react"
import Input from "../../components/Input/Input"
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";

import api from "../../services/Api/Api";

import { AxiosResponse } from 'axios'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';
import  z  from 'zod'
import { useEffect } from "react";


const schema = z.object({
    question: z.string(),
    active: z.boolean().default(true),
});

type QuestionProps = z.infer<typeof schema>;

function QuestionDb() {

  const { isOpen, toggle } = useModal();

  
const schema = z.object({
  question: z.string(),
  active: z.boolean().default(true),
});

type QuestionProps = z.infer<typeof schema>;

function QuestionDb() {
  const { isOpen, toggle } = useModal();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<QuestionProps>({
    defaultValues: { question: '', active: true },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const handleQuestion = async (props: QuestionProps) => {
    try {
      const response: AxiosResponse<QuestionProps> = await api.get('question', {
        params: {
          question: props.question,
          active: props.active,
        },
      });
      console.log(response.data.question);
    } catch (error) {
      console.error(error as Error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<QuestionProps> = await api.get('question', {
          params: {
            question: '',
            active: true,
          },
        });
        console.log(response.data.question);
      } catch (error) {
        console.error(error as Error);
      }
    };

    fetchData();
  }, []); 
}

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
                    <div className="w-[100%]">
                      <Input title="WADW" isActive={false} />
                    </div>
                </div>
                <div className="2xl:w-[100%] flex flex-col gap-8 justify-end items-end lg:w-[90%]">
                    <SparkButton text="Adicionar pergunta" customWidth="12rem" onClick={()=>{}}/>
                    <Modal title="Criação de pergunta" isOpen={isOpen} toggle={toggle}/>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default QuestionDb
