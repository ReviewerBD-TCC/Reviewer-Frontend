import { SparkButton, SparkTextfield } from "@bosch-web-dds/spark-ui-react"
import { Header } from "../../components/Header/Header"
import { Selected } from "../../components/Select/Selected"
import { ToastContainer, Bounce, toast } from "react-toastify";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "context/AuthProvider";
import { CreateFormInterface } from "interfaces/CreateForm";
import { FormService } from "services/FormService";
import { useForm } from "react-hook-form";
import { CreateFormResolver } from "validations/CreateFormResolver";
import { QuestionService } from "services/questionService";
import { useQuery } from "react-query";
import { QuestionProps } from 'interfaces/Question';


export function CreateForms() {
    const { accessToken } = useAuth();
    const yearOptions = [2024, 2025, 2026]
    const [title, setTitle] = useState<string>("")
    const [year, setYear] = useState<number>()
    const [questions, setQuestions] = useState<number[]>([])
    const [questionListRender, setQuestionListRender] = useState<number[]>([])
    const [selectedValues, setSelectedValues] = useState<QuestionProps[]>([]);
    const [ valido, setValido ] = useState<Boolean>(false)

    const addNewQuestion = () => {
        setQuestionListRender([...questionListRender, questionListRender[questionListRender.length] + 1])
    }

    const { register,  formState: { isValid } } = useForm<CreateFormInterface>({
        resolver: CreateFormResolver,
    });

    const createForm = async () => {
        try {

            const requestData: CreateFormInterface = {
                title: title,
                year: year,
                questionsId: questions
            };

            const { data, status } = await FormService.createForm(requestData, accessToken);

            if (status === 201) {
                console.log(data)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const { data: responseList = [] } = useQuery("question", () => {
        return QuestionService.useQuestions(accessToken)
    })

    const handleSelectChange = (index: number, newValue: QuestionProps) => {
        const questionExists = selectedValues.some(
            (question) => question.id === newValue.id
        );

        if (!questionExists) {
            if (index >= 0 && index < selectedValues.length) {
                const updatedQuestions = [...selectedValues];
                updatedQuestions[index] = newValue;
                setSelectedValues(updatedQuestions);
            } else {
                setSelectedValues([...selectedValues, newValue]);
            }
        } else {
            showToastMessageError(); 
        }
    };

    useEffect(() => {
        if(title){
            setValido(true)
        }
        const validIds = selectedValues.map((q) => q.id).filter((id): id is number => id !== undefined);
        setQuestions((prev) => Array.from(new Set([...prev, ...validIds])));
    }, [selectedValues])

    const showToastMessageError = () => {
        toast.warning('Essa pergunta já foi adicionada!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const handleYearChange = (value: number) => {
        setYear(value); 
    };

    return (
        <div className="h-auto min-h-screen w-full flex flex-col items-center">
            <Header />
            <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
                <form action="" className="w-[85%] h-auto flex flex-col gap-9 pb-7 pt-7">
                    <div className="w-full h-12 flex items-center">
                        <h1 className="text-3xl font-bold">Criação de formulário</h1>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[74%]">

                            <SparkTextfield
                                label="Título do feedback"
                                placeholder="Feedback"
                                defaultValue={title} // Use defaultValue para evitar controle explícito
                                {...register("title", {
                                    setValueAs: (value) => {
                                        setTitle(value); // Atualiza o estado
                                        return value;
                                    },
                                })}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newValue = e.target.value;
                                    console.log("Novo valor do título:", newValue);
                                    setTitle(newValue); // Atualiza o estado
                                }}
                            />

                        </div>
                        <div className="w-[22%]">
                            <Selected
                                labelText="Ano"
                                options={yearOptions}
                                selectedValue={year} 
                                setSelectedValue={handleYearChange}
                                {...register("year", {
                                    setValueAs: (value) => {
                                        setYear(value);
                                        return value;
                                    },
                                })}
                            />
                        </div>
                    </div>
                    <div className="w-full h-auto flex flex-col gap-6">
                        {
                            questionListRender.map((component, index) => (
                                <div className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center">
                                    <div className="w-[95%]">
                                        <Selected
                                            selectedValue={selectedValues}
                                            setSelectedValue={(newValue: QuestionProps) => handleSelectChange(index, newValue)}
                                            zIndex={25}
                                            labelText="Pergunta"
                                            question={responseList.map((item: QuestionProps) => item)}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <SparkButton text="Adicionar pergunta" icon="add" onClick={addNewQuestion} />
                        <SparkButton text="Finalizar" disabled={!valido}  onClick={createForm} />
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}