import {Header} from "../../components/Header/Header"
import { SparkButton, SparkSearchBar, SparkNotification, SparkChip } from "@bosch-web-dds/spark-ui-react";
import { useState } from "react";

function Indication() {
  const [showNotify, setShowNotify] = useState(false);
  const [showChip, setShowChip] = useState(true);
  const [chips, setChips] = useState<string[]>([]);

  const addChip = (value: string)=>{
    if(chips.length < 5){
      setChips(i => [...i, value])
      setShowChip(true);
    }
  }

  const removeChip = (item: string) => {
    const valueChip = chips.indexOf(item);
    console.log(valueChip);
    if (valueChip > -1) {
        chips.splice(valueChip, 1);
        setShowChip(false);
    }
  }

  if(showChip==false){
    setShowChip(true)
  }

  const handleSearch = (value: string) => {
    if (value !== '') {
      addChip(value)
      setShowNotify(false);
    } else {
      setShowNotify(true);
    }
  };




  return (
    <>
      <Header/>
        <div className={`bg-[#D0D0D0] w-full h-screen flex justify-center items-center`}>
          <div className="bg-boschWhite h-screen w-[90%] flex items-center justify-center">
            <div className="w-[80%] h-auto flex flex-col justify-center gap-10">
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="font-bold text-4xl">Olá, Santos, Keven.</h1>
                <p className="font-regular text-x">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
              </div>
              <SparkSearchBar
                inputs={{ "placeholder": "Digite o nome do colaborador", "label": "Nome" }}
                whenSearch={(value) => handleSearch(value.toString())}

              />
              <div className="flex gap-4 overflow-auto">
                {chips.map((item)=>
                 <SparkChip content={item} onClick={()=>removeChip(item)} selected close={showChip} />)}
              </div>
              {showNotify && <SparkNotification type="bar" variant="error" ><p>É necessário informar o colaborador antes de continuar.</p></SparkNotification>}
              <div className="flex justify-end mt-20 ">
                <SparkButton text="Enviar" type="submit" customWidth="8rem" />
              </div>
            </div>
          </div>
        </div>
    </>
)
};
export default Indication