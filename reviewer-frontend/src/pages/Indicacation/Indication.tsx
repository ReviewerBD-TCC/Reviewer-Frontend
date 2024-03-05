import Header from "../../components/Header/Header"
import { SparkButton, SparkSearchBar, SparkNotification, SparkChip } from "@bosch-web-dds/spark-ui-react";
import { useState } from "react";

function Indication() {
  const [showNotify, setShowNotify] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showChip, setShowChip] = useState(false);

  const [chips, setChips] = useState<string[]>([]);


  const handleSearch = (value: string) => {
    if (value !== '') {
      setInputValue(value);
      console.log(`${value}`);    
      setChips(i => [...i, value])
      console.log(chips)
      setShowChip(true);
      setShowNotify(false);
    } else {
      setShowNotify(true);
      setShowChip(false);
    }
  };




  return (
    <>
      <Header/>
        <div className={`bg-[#D0D0D0] w-full flex justify-center items-center`}>
          <div className="bg-bosch-white h-screen w-[90%] flex items-center justify-center">
            <div className="w-[80%] h-auto flex flex-col justify-center gap-10">
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="font-bold text-4xl">Olá, Santos, Keven.</h1>
                <p className="font-regular text-x">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
              </div>
              <SparkSearchBar
                inputs={{ "placeholder": "Digite o nome do colaborador", "label": "Nome" }}
                whenSearch={(value) => handleSearch(value.toString())}

              />
              <div className="flex gap-4">
                {showChip && chips.map((item)=> <SparkChip content={item} whenClose={()=>{}} selected />)  }
              </div>
              {showNotify && <SparkNotification type="bar" variant="error" ><p>Algo deu errado, tente novamente!</p></SparkNotification>}
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