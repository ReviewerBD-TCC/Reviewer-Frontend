import { SparkButton, SparkTextfield } from "@bosch-web-dds/spark-ui-react"
import { Header } from "../../components/Header/Header"
import { Selected } from "../../components/Select/Selected"
import { RenderFormContent } from "components";
import { useState } from "react";
import { useAuth } from "context/AuthProvider";
import { CreateFormInterface } from "interfaces/CreateForm";
import { FormService } from "services/FormService";

export function CreateForms() {
    const { accessToken } = useAuth();
    const [components, setComponents]: any = useState([]);
    const yearOptions = [2024, 2025, 2026]
    const { listQuestion } = useAuth();

    const addComponent = () => {
        setComponents([...components, <RenderFormContent key={components.length} />]);
    }

    const createForm = async () => {
        try {


            const requestData: CreateFormInterface = {
                title: "FORMULARIO",
                year: 2025,
                questionsId: listQuestion
            };

            const data = await FormService.createForm(requestData, accessToken);

            console.log(data)

            // if (status === 201) {
            //     console.log(data)
            // }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="h-auto min-h-screen w-full flex flex-col items-center">
            <Header />
            <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
                <div className="w-[85%] h-auto flex flex-col gap-9 pb-7 pt-7">
                    <div className="w-full h-12 flex items-center">
                        <h1 className="text-3xl font-bold">Criação de formulário</h1>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[74%]">
                            <SparkTextfield label="Título do feedback" placeholder="Feedback" onChange={() => console.log()} />
                        </div>
                        <div className="w-[22%]">
                            <Selected zIndex={50} labelText="Ano" options={yearOptions} />
                        </div>
                    </div>
                    <form action="" className="w-full h-auto flex flex-col gap-6">
                        {
                            components.map((component: any, index: number) => (
                                <div key={index}>{component}</div>
                            ))
                        }
                    </form>

                    <div className="w-full flex justify-between items-center">
                        <SparkButton text="Adicionar pergunta" icon="add" onClick={addComponent} />
                        <SparkButton text="Finalizar" onClick={createForm} />
                    </div>
                </div>
            </div>
        </div>
    )
}