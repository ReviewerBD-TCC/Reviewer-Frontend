import { SparkButton } from "@bosch-web-dds/spark-ui-react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MouseEventHandler, useEffect } from "react";
import { Header, TableUser } from "../../components/index";
import { CreateIndication } from "interfaces/CreateIndication";
import { useAuth } from "context/AuthProvider";
import { IndicationService } from "services/IndicationService";
import { UserIndicatedInterface } from "interfaces/UserIndicated";
import { useNavigate } from "react-router-dom";
import { QuestionProps } from "interfaces/Question";
import useModal from "../../hooks/useModal";
import ModalIndication from "components/Modal/ModalIndication.tsx";

function Indication() {

    const { accessToken, user, selectedUsers } = useAuth();

    const navigate = useNavigate()

    const {isOpen, toggle} = useModal()

    useEffect(() => {
        async function fetchData() {
            try {
                const { status } = await IndicationService.getUsers(accessToken);
                if (status === 200) {
                    console.log(user)
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        }
        fetchData();
    }, [accessToken]);

    console.log(selectedUsers)


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

    const onSubmit: MouseEventHandler<HTMLSparkButtonElement> = async (event) => {
        event.preventDefault();

        try {
            const indicateds: UserIndicatedInterface[] = selectedUsers.map((userId: QuestionProps) => {

                const eachUser: UserIndicatedInterface = {
                    userIndicated: userId.id
                }
                return eachUser
            }
            );
            const requestData: CreateIndication = {
                userIndication: user.id,
                indicateds: indicateds
            };

            console.log(requestData)
            const { status } = await IndicationService.createIndication(accessToken, requestData);
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
{/* 
                        <div >
                            <TableUser />
                        </div> */}

                        <SparkButton text="Selecionar colaboradores" customWidth="15rem" type="button" onClick={toggle}/>
                        <ToastContainer />
                        <ModalIndication isOpen={isOpen} toggle={toggle} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Indication