import Header from "../../components/Header/Header"
import { SparkButton, SparkDropdown, SparkNotification, SparkChip} from "@bosch-web-dds/spark-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../services/Api/Api";

interface IndicationProps {
  id: number;
}

function Indication(props: IndicationProps) {
  const [showNotify, setShowNotify] = useState(false);
  const [showChip, setShowChip] = useState(true);
  const [chips, setChips] = useState<string[]>([]);

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');


  const addChip = (value: string) => {
    if (chips.length < 5) {
      setChips((prevChips) => [...prevChips, value]);
      setShowChip(true);
    }
  };

  const removeChip = (item: string) => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== item));
    setShowChip(false);
  };

  const handleSearch = (value: string) => {
    if (value !== '') {
      addChip(value);
      setShowNotify(false);
    } else {
      setShowNotify(true);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`
        const response = await api.get(`users`);
        const formattedOptions = response.data.map(user => ({
          value: user.id,
          label: user.name 
        }));
        setUsers(formattedOptions);
      } catch (error) {
        console.error('Erro ao obter resultados de autocompletar:', error);
      }
    };
    fetchUsers();
  }, []);
  

  return (
    <>
      <Header />
      <div className="bg-[#D0D0D0] w-full h-screen flex justify-center items-center">
        <div className="bg-boschWhite h-screen w-[90%] flex items-center justify-center">
          <div className="w-[80%] h-auto flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-2 mb-10">
              <h1 className="font-bold text-4xl">Olá Santos, Keven.</h1>
              <p className="font-regular text-x">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
            </div>
            <SparkDropdown 
              whenChange={(value) => (value.toString())}
              label="Selecione o usuário"
              options={users}
            />
            <div className="flex gap-4 overflow-auto">
              {chips.map((item, index) => (
                <SparkChip key={index} content={item} onClick={() => removeChip(item)} selected close={showChip} />
              ))}
            </div>
            {showNotify && <SparkNotification type="bar" variant="error"><p>É necessário informar o colaborador antes de continuar.</p></SparkNotification>}
            <div className="flex justify-end mt-20 ">
              <SparkButton text="Enviar" type="submit" customWidth="8rem" />
            </div>
          </div>
        </div>
      </div>//
    </>
  );
}

export default Indication;