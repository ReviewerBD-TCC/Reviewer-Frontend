import { Header } from "components";
import { SparkButton, SparkChip } from "@bosch-web-dds/spark-ui-react";
import { useEffect, useState } from "react";
import { SelectedIndication } from "../../components/SelectedIndication/SelectedIndication";
import { IndicationService } from "services/IndicationService";
import { CreateIndication } from "../../interfaces/CreateIndication";
import { User } from "../../interfaces/CreateUser";
import { IndicationResolver } from "../../validations/InterfaceSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "context/AuthProvider"; 

function Indication() {
  const [showChip, setShowChip] = useState(true);
  const [chips, setChips] = useState<User[]>([]);

  const [userListSelect, setUserListSelect] = useState<number[]>([])
  const [userList, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { accessToken, user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const { status, data } = await IndicationService.getUsers(accessToken);
        if (status === 200) {

          console.log(user)

          const usernames = data.map(user => user);

          setUsers(usernames)
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }
    fetchData();
  }, [accessToken]);

  const addChip = (value: User) => {
    if (chips.length < 5) {
      console.log(value);
      setChips((prevChips) => [...prevChips, value]);
      setUserListSelect((prevUserList) => [...prevUserList, value.id!]);
      setShowChip(true);
      console.log(userListSelect);
    }
  };

  const removeChip = (item: User) => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== item));
    setShowChip(false);
    setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(userList => userList !== item.name));
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
      setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(userList => userList !== value.name));
    }
  };


  const { register, handleSubmit } = useForm({
    resolver: IndicationResolver,
  });

  const onSubmit: SubmitHandler<CreateIndication> = async (values) => {
    console.log(values)
    console.log('bom dia')
    try {

      const indicateds = userListSelect.map(userId => ({ userIndicated: userId }));

      const requestData: CreateIndication = {
        userIndication: user.id,
        indicateds: indicateds
      };

      const { status, data } = await IndicationService.createIndication(accessToken, requestData);
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
              <p className="font-regular text-x">Este formulário é referente ao ano de 2024</p>
            </div>
            <SelectedIndication
              labelText="Selecione o usuário"
              options={userList.map(userFix => ({ name: userFix.name, id: userFix.id }))}
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
              <SparkButton text="Enviar" type="submit" customWidth="8rem" onChange={handleSubmit(onSubmit)} />
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
