import { SparkButton, SparkTextfield } from "@bosch-web-dds/spark-ui-react";
import { Header } from "../../components/Header/Header";
import { Selected } from "../../components/Select/Selected";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "context/AuthProvider";
import { FormInterface } from "interfaces/CreateForm";
import { FormService } from "services/FormService";
import { useForm } from "react-hook-form";
import { CreateFormResolver } from "validations/CreateFormResolver";
import { QuestionService } from "services/questionService";
import { useQuery } from "react-query";
import { QuestionProps } from "interfaces/Question";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { QuestionList } from "interfaces/QuestionList";

export function CreateForms() {
  const { accessToken, convertToDate } = useAuth();
  const yearOptions: number[] = [];
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<number>();
  const [questionListRender, setQuestionListRender] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<QuestionProps[]>([]);
  const [valido, setValido] = useState<boolean>(false);
  const [formList, setFormList] = useState<FormInterface[]>([]);
  const [question, setQuestion] = useState<QuestionProps>();
  const navigate = useNavigate();

  const { data: responseList = [] } = useQuery("question", () => {
    return QuestionService.getQuestions(accessToken);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forms = await FormService.getAllForms(accessToken);
       
       setFormList(forms)
      } catch (error) {
        console.error("Erro ao carregar formulários:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const addNewQuestion = () => {
    setQuestionListRender([
      ...questionListRender,
      questionListRender[questionListRender.length] + 1,
    ]);
    const index = responseList.findIndex((eachQuestion: QuestionProps)=> eachQuestion === question)
    responseList.splice(index, 1)
    if (title && year && selectedValues.length > 0) {
      setValido(true);
    }
  };

  const { register } = useForm<FormInterface>({
    resolver: CreateFormResolver,
  });

  const generateDateWithYear = (year: number): string => {
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const fullDate = new Date(year, currentMonth - 1, currentDay);

    return format(fullDate, "yyyy-MM-dd");
  };

  for (let i = 0; i < 5; i++) {
    const year = new Date().getFullYear() + i;
    yearOptions.push(year);
  }

  const createForm = async () => {
    try {
      if (title && year) {
        const formattedDate = generateDateWithYear(year);

        const questions: QuestionList[] = selectedValues.map((question) => ({
          question: question.id,
        }));

        const requestData: FormInterface = {
          title: title,
          year: new Date(formattedDate),
          questions,
        };

        const { data, status } = await FormService.createForm(
          requestData,
          accessToken
        );

        if (status === 201) {
          showToastSuccessMessage();
          setTimeout(() => {
            console.log(data);
            navigate("/home");
          }, 1500);
        } else {
          showToastMessageError("Erro ao criar formulário");
        }
      } else {
        showToastMessageError("Erro ao criar formulário");
      }
    } catch (error) {
      console.error(error);
      showToastMessageError("Erro ao criar formulário");
    }
  };
  
  const handleSelectChange = (index: number, newValue: QuestionProps) => {
    const questionExists = selectedValues.some(
      (question) => question.id === newValue.id
    );
   
    if (!questionExists) {
      if (index >= 0 && index < selectedValues.length) {
        const updatedQuestions = [...selectedValues];
        console.log(updatedQuestions)
        updatedQuestions[index] = newValue;
        setSelectedValues(updatedQuestions);
        setQuestion(newValue)
        
      } else {
        setSelectedValues([...selectedValues, newValue]);
        setQuestion(newValue)
      }
    } else {
      showToastMessageError("Essa pergunta já foi adicionada!");
    }
  };

  const showToastMessageError = (message: string) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  };

  const showToastSuccessMessage = () => {
    toast.success("Formulário criado com sucesso!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  };

  const handleYearChange = (value: number) => {

    const currentFormFiltered = formList?.find(
      (form: FormInterface) =>
        convertToDate(form.year)?.getFullYear() === value
    );

    if (currentFormFiltered) {
      showToastMessageError(
        "Um formulário com esse ano já existe, verifique no banco de formulários"
      );
    } else {
      setYear(value);
    }
  };

  return (
    <div className="h-auto min-h-screen w-full flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
        <form
          action=""
          className="w-full pl-6 h-auto flex flex-col gap-9 pb-7 pt-10"
        >
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
                zIndex={25}
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
            {questionListRender.map((component, index) => (
              <div className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center">
                <div className="w-[95%] cursor-pointer">
                  <Selected
                    selectedValue={selectedValues}
                    setSelectedValue={(newValue: QuestionProps) =>
                      handleSelectChange(index, newValue)
                    }
                    zIndex={25}
                    labelText="Pergunta"
                    question={responseList.filter(
                      (item: QuestionProps) => item.active
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-between items-center">
            <SparkButton
              text="Adicionar pergunta"
              icon="add"
              onClick={addNewQuestion}
            />
            <SparkButton
              text="Finalizar"
              disabled={!valido}
              onClick={createForm}
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
