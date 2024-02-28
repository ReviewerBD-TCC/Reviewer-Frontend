import Header from "../../components/Header/Header"
import { SparkButton, SparkSearchBar } from "@bosch-web-dds/spark-ui-react";

function Indication() {
  return (
    <>
      <Header/>
        <div className={`bg-[#D0D0D0] w-full h-full overflow-hidden flex justify-center items-center`}>
          <div className="bg-bosch-white h-screen w-[90%] flex items-center justify-center">
            <div className="w-[1234px] h-[729px] flex flex-col justify-center gap-20">
              <div className="bottom-">
                <h1 className="font-bold text-4xl">Olá, Santos, Keven.</h1>
                <p className="font-bold ">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
              </div>
              <SparkSearchBar inputs="{&quot;placeholder&quot;:&quot;Digite o nome do colaborador&quot;,&quot;label&quot;:&quot;Nome&quot;}"/>
              <div className="flex justify-end ">
                <SparkButton text="Enviar" type="submit" customWidth="8rem" />
              </div>
            </div>
          </div>
        </div>
    </>
)}

export default Indication
