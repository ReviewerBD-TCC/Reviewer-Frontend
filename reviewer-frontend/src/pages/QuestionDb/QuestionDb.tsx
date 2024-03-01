import Header from "../../components/Header/Header"
import { SparkButton, SparkNotification } from "@bosch-web-dds/spark-ui-react"
import Input from "../../components/Input/Input"

function QuestionDb() {
  return (
    <>
        <Header/>
        <div className={`bg-[#D0D0D0] w-full h-full overflow-hidden flex justify-center items-center`}>
          <div className="bg-bosch-white w-[90%] h-auto flex items-center justify-center">
            <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
                <div className="w-[50%] flex flex-col justify-center items-start">
                    <h1 className="font-bold text-4xl text-start w-full ">Banco de perguntas</h1>
                    <SparkNotification type="bar" variant="neutral" icon="info-i">
                        <p>Estas são perguntas automáticas, é possível ativa-las ou desativa-las.</p>
                    </SparkNotification>
                </div>
                <Input/>
                <div className="w-[50%] flex flex-col gap-8 justify-end items-end">
                    <SparkButton text="Adicionar pergunta" customWidth="12rem"/>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default QuestionDb
