import Header from "../../components/Header/Header"
import { SparkButton, SparkDropdown, SparkNotification, SparkChip} from "@bosch-web-dds/spark-ui-react";
import { useState } from "react";
import api from "../../services/Api/Api";
import { useQuery } from "react-query";

interface IndicationProps {
  id: number;
}

function Indication(props: IndicationProps) {
  const [showChip, setShowChip] = useState(true);
  const [chips, setChips] = useState<string[]>([]);

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); 

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

  // const handleSearch = (selectedValue: string) => {
  //   if (selectedValue !== '') {
  //     addChip(selectedValue);
  //     setShowNotify(false);
  //   } else {
  //     setShowNotify(true);
  //   }
  // };

  const handleDropdownChange = (selectedUser: string, selectedValue: string) => {
    setSelectedUsers([...selectedUsers, selectedUser]);
    addChip(selectedValue);
    console.log(selectedUsers)
  };

  const handleFormSubmit = async () => {
    try {
      const response = await api.post('form_indication', { users: selectedUsers }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Usuários enviados com sucesso:', response.data);
      setSelectedUsers([]);
    } catch (error) {
      console.error('Erro ao enviar usuários:', error);
    }
  };

  const { error } = useQuery("question", async () => {
    const response = await api.get('users',  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const formattedOptions = response.data.map(user => ({
      label: user.name 
    }));
    setUsers(formattedOptions)
    return response.data;
  },)
  
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
              whenChange={()=>{}} 
              label="Selecione o usuário"
              options={users}
            />
            <div className="flex gap-4 overflow-auto">
              {chips.map((item, index) => (
                <SparkChip key={index} content={item} onClick={() => removeChip(item)} selected close={showChip} />
              ))}
            </div>
            <div className="w-[97%]">
              {error && <SparkNotification type="bar" variant="error"><p>Não foi possível encontrar nenhum colaborador.</p></SparkNotification>}
            </div>
            <div className="flex justify-end mt-20 ">
              <p>{selectedUsers}</p>
              <SparkButton text="Enviar" type="submit" customWidth="8rem" onSubmit={()=>handleFormSubmit}/>
            </div>
          </div>
        </div>
      </div>//
    </>
  );
}

export default Indication;