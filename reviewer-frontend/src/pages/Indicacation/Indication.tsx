import { SparkButton, SparkChip } from "@bosch-web-dds/spark-ui-react";
import { ToastContainer, Bounce, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../interfaces/CreateUser";
import { MouseEventHandler, useEffect, useState } from "react";
import { Header, TableUser } from "../../components/index";
import { CreateIndication } from "interfaces/CreateIndication";
import { SelectedIndication } from "components/SelectedIndication/SelectedIndication";
import { useAuth } from "context/AuthProvider";
import { IndicationService } from "services/IndicationService";
import { UserIndicatedInterface } from "interfaces/UserIndicated";
import { useNavigate } from "react-router-dom";

function Indication() {

    const [showChip, setShowChip] = useState(true);
    const [chips, setChips] = useState<User[]>([]);

    const [userListSelect, setUserListSelect] = useState<number[]>([])
    const [userList, setUsers] = useState<any[]>([]);
    // const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const { accessToken, user, selectedUsers } = useAuth();

    const navigate = useNavigate()

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

    console.log(selectedUsers)

    const addChip = (value: User) => {
        if (chips.length < 5) {

            setChips((prevChips) => [...prevChips, value]);
            setUserListSelect((prevUserList) => [...prevUserList, value.id!]);
            setShowChip(true);

        }
    };

    const removeChip = (item: User) => {
        setChips((prevChips) => prevChips.filter((chip) => chip !== item));
        setShowChip(false);
        // setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(userList => userList !== item.name));
    };

    const handleUserSelect = (value: User) => {
        if (value !== null && !selectedUsers.includes(value.name)) {
            if (selectedUsers.length < 5) {
                // setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, value.name]);
                console.log(value.id)
                addChip(value);
            }
        } else {
            removeChip(value);
            // setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(userList => userList !== value.name));
        }
    };

    const showToastMessage = () => {
        toast.success('Indicação realizada com sucesso!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    }
    const showToastWarningMessage = () => {
        toast.warning('Você não pode se adicionar!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    }

    const onSubmit: MouseEventHandler<HTMLSparkButtonElement> = async (event) => {
        event.preventDefault();

        try {
            const indicateds: UserIndicatedInterface[] = userListSelect.map(userId => ({ userIndicated: userId }));

            const requestData: CreateIndication = {
                userIndication: user.id,
                indicateds: indicateds
            };

            console.log(requestData)

            const { status, data } = await IndicationService.createIndication(accessToken, requestData);
            console.log(requestData)
            if (status === 201) {
                showToastMessage()
                setTimeout(() => {
                    navigate('/home')
                }, 1500)
            }

        } catch (error) {
            console.error('Erro ao enviar o cliente:', error);
        }
    };
    userList.findIndex((each, index)=>{
        if(each.name == user.name){
            userList.splice(index, 1)
        }
    })
   console.log(selectedUsers[0])
    return (
        <div className="h-auto min-h-screen w-full flex flex-col items-center">
            <Header />
            <div className="w-[90%] min-h-[90%] h-auto flex items-center justify-center pt-7">
                <div className="w-[95%] h-auto flex flex-col justify-center items-center gap-8 pt-7 pb-7">
                    <form className="w-[80%] min-h-[90%] h-auto flex flex-col justify-center gap-10">
                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="font-bold text-4xl">Olá, {user?.name}.</h1>
                            <p className="font-regular text-x">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
                            <p className="font-regular text-x">Este formulário é referente ao ano de 2024</p>
                        </div>

                        {/* <SelectedIndication
                            labelText="Selecione o usuário"
                            options={userList.map(userFix => ({ name: userFix.name, id: userFix.id }))}
                            zIndex={50}
                            onChange={handleUserSelect}
                        /> */}
                          <div>
                                <TableUser/>
                            </div>

                        <div className="flex gap-4 overflow-auto">
                            {selectedUsers.map((item, id) => {
                                return (
                                    <SparkChip key={id} content={item.name} onClick={() => removeChip(item)} selected close={showChip} />
                                );
                            })}
                        </div>

                        <SparkButton text="Indicar" customWidth="15rem" type="button" onClick={onSubmit} />
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Indication