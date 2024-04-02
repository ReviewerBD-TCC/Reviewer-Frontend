import { Header } from "components";
import { SparkButton, SparkNotification, SparkChip } from "@bosch-web-dds/spark-ui-react";
import { useEffect, useState } from "react";
import { SelectedIndication } from "../../components/SelectedIndication/SelectedIndication";
import { IndicationService } from "services/IndicationService";
import { CreateIndication } from "../../interfaces/CreateIndication";
import { User } from "../../interfaces/CreateUser";
import { IndicationResolver } from "../../validations/InterfaceSchema";
import { useForm, SubmitHandler } from "react-hook-form";

function Indication() {
  const [showChip, setShowChip] = useState(true);
  const [chips, setChips] = useState<User[]>([]);

  const [userListSelect, setUserListSelect] = useState<number[]>([])
  const [user, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        const { status, data } = await IndicationService.getUsers(token);
        if (status === 200) {

          const usernames = data.map(user => user);

          setUsers(usernames)
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }
    fetchData();
  }, [token]);

  const addChip = (value: User) => {
    if (chips.length < 5) {
      setChips((prevChips) => [...prevChips, value]);
      setShowChip(true);
    }
  };

  const removeChip = (item: User) => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== item));
    setShowChip(false);
    setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(user => user !== item.name));
  };

  const handleUserSelect = (value: User) => {
    if (value !== null && !selectedUsers.includes(value.name)) {
      if (selectedUsers.length < 5) {

        setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, value.name]);
        console.log(value.id)
        addChip(value);

      }
    } else {
      removeChip(value);
      setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(user => user !== value.name));
    }
  };


  const { register, handleSubmit } = useForm({
    resolver: IndicationResolver,
  });

  const onSubmit: SubmitHandler<CreateIndication> = async (values) => {
    try {
      const { status, data } = await IndicationService.createIndication(token, values);
      if (status === 201) {

        console.log('Indicação enviada com sucesso:', data);
      }
    } catch (error) {
      console.error('Erro ao enviar a indicação:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#D0D0D0] w-full h-screen flex justify-center items-center">
        <div className="bg-boschWhite h-screen w-[90%] flex items-center justify-center">
          <form className="w-[80%] h-auto flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-2 mb-10">
              <h1 className="font-bold text-4xl">Olá Keven Santos.</h1>
              <p className="font-regular text-x">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
            </div>
            <SelectedIndication
              labelText="Selecione o usuário"
              options={user.map(userFix => ({ name: userFix.name, id: userFix.id }))}
              zIndex={50}
              onChange={handleUserSelect}
            />
            <div className="flex gap-4 overflow-auto">
              {chips.map((item, id) => {
                 // Console.log fora do componente
                return (
                  <SparkChip key={id} content={item.name} onClick={() => removeChip(item)} selected close={showChip} />
                );
              })}
            </div>

            {/* <div className="w-[97%]">
              {error && <SparkNotification type="bar" variant="error"><p>Não foi possível encontrar nenhum colaborador.</p></SparkNotification>}
            </div> */}

            <div className="flex justify-end mt-20 ">
              <SparkButton text="Enviar" type="submit" customWidth="8rem" onClick={handleSubmit(onSubmit)} />
            </div>
            <p>Usuários selecionados:
              {selectedUsers.length}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Indication;
