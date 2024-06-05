import { SparkButton } from "@bosch-web-dds/spark-ui-react";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Header } from "../../components/index";
import { IndicationService } from "services/IndicationService";
import useModal from "../../hooks/useModal";
import ModalIndication from "components/Modal/ModalIndication.tsx";
import { useMsal } from "@azure/msal-react";
import { date } from "zod";

function Indication() {

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

    return (
        <div className="h-auto min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-full min-h-[90%] h-auto flex items-center justify-center pt-7">
                <div className="w-full h-auto flex flex-col justify-center items-center gap-8 pt-7 pb-7">
                    <form className="w-[87%] min-h-[90%] h-auto flex flex-col justify-center gap-10">
                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="font-bold text-4xl mb-10">Olá, {account?.name}.</h1>
                            <p className="font-regular text-x">Você tem um formulário de feedback novo, indique colegas do seu time para respondê-lo.</p>
                            <p className="font-regular text-x">Este formulário é referente ao ano de {new Date().getFullYear()}</p>
                        </div>

                        <SparkButton text="Selecionar colaboradores" customWidth="15rem" type="button" onClick={toggle}/>
                        <ModalIndication isOpen={isOpen} toggle={toggle} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Indication