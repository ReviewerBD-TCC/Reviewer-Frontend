import Header from "../../components/Header/Header"
import { SparkButton, SparkNotification} from "@bosch-web-dds/spark-ui-react"
import Input from "../../components/Input/Input"
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";

function QuestionDb() {

  const { isOpen, toggle } = useModal();


  return (
    <div className="h-screen">
        <Header/>
        <div className={`bg-[#D0D0D0] w-full overflow-hidden flex justify-center items-center`}>
          <div className="bg-bosch-white w-[90%] h-screen flex items-center justify-center">
            <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
                <div className="w-[100%] flex flex-col justify-center items-start gap-2">
                    <h1 className="font-bold text-4xl text-start w-full ">Banco de perguntas</h1>
                    <div className="w-[100%]">
                      <SparkNotification type="bar" variant="neutral" icon="info-i">
                          <p>Estas são perguntas automáticas, é possível ativa-las ou desativa-las.</p>
                      </SparkNotification>
                    </div>
                    <div className="w-[100%]">
                      <Input/>
                    </div>
                    
                </div>
                
                <div className="w-[100%] flex flex-col gap-8 justify-end items-end">
                    <SparkButton text="Adicionar pergunta" customWidth="12rem" onClick={toggle}/>
                    <Modal title="Criação de pergunta" isOpen={isOpen} toggle={toggle}/>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default QuestionDb
