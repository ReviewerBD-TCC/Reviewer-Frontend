import { SparkButton } from "@bosch-web-dds/spark-ui-react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MouseEventHandler, useEffect } from "react";
import { Header, TableUser } from "../../components/index";
import { CreateIndication } from "interfaces/UserInterfaces/CreateIndication";
import { useAuth } from "context/AuthProvider";
import { IndicationService } from "services/IndicationService";
import { UserIndicatedInterface } from "interfaces/UserInterfaces/UserIndicated";
import { useNavigate } from "react-router-dom";
import { QuestionProps } from "interfaces/QuestionsInterface/Question";
import useModal from "../../hooks/useModal";
import ModalIndication from "components/Modal/ModalIndication.tsx";
import { useMsal } from "@azure/msal-react";

function Indication() {

    const { selectedUsers } = useAuth();
    const { instance } = useMsal()

    const account = instance.getActiveAccount();

    const {isOpen, toggle} = useModal()

    useEffect(() => {
        async function fetchData() {
            try {
                const { status } = await IndicationService.getUsers();
                if (status === 200) {
                    console.log(user)
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        }
        fetchData();
    }, []);

    console.log(selectedUsers)

    return (
        <div className="h-auto min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-full min-h-[90%] h-auto flex items-center justify-center pt-7">
                <div className="w-full h-auto flex flex-col justify-center items-center gap-8 pt-7 pb-7">
                    <form className="w-[87%] min-h-[90%] h-auto flex flex-col justify-center gap-10">
                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="font-bold text-4xl mb-10">Olá, {account?.name}.</h1>
                            <p className="font-regular text-x">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
                            <p className="font-regular text-x">Este formulário é referente ao ano de 2024</p>
                        </div>

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