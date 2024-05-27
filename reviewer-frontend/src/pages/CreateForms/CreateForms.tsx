import { SparkButton, SparkNotification, SparkTextfield, SparkIcon } from "@bosch-web-dds/spark-ui-react";
import { Header } from "../../components/Header/Header";
import { Selected } from "../../components/Select/Selected";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "context/AuthProvider";
import { FormInterface } from "../../interfaces/FormInterfaces/CreateForm";
import { FormService } from "../../services/FormService";
import { useForm } from "react-hook-form";
import { CreateFormResolver } from "../../validations/CreateFormResolver";
import { QuestionService } from "../../services/questionService";
import { useQuery } from "react-query";
import { QuestionProps } from "../../interfaces/QuestionsInterface/Question";
import { useNavigate } from "react-router-dom";
import { QuestionList } from "interfaces/QuestionsInterface/QuestionList";
import BackButton from "components/BackButton/BackButton";
import { ShowMessage } from "../../functions/ShowMessage";
import { generateDateWithYear } from "../../functions/GenerateDate";

export function CreateForms() {
  const { convertToDate } = useAuth();
  const yearOptions: number[] = [];
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<number>();
  const [questionListRender, setQuestionListRender] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<QuestionProps[]>([]);
  const [valido, setValido] = useState<boolean>(false);
  const [formList, setFormList] = useState<FormInterface[]>([]);
  const [responseList, setResponseList] = useState<QuestionProps[]>([]);

  const navigate = useNavigate();

  const { data: initialResponseList = [] } = useQuery("question", () => {
    return QuestionService.getQuestions();
  });

  useEffect(() => {
    setResponseList(initialResponseList);
  }, [initialResponseList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forms = await FormService.getAllForms();

        setFormList(forms);
      } catch (error) {
        console.error("Erro ao carregar formulários:", error);
      }
    };

    fetchData();
  }, []);

  const addNewQuestion = () => {
    setQuestionListRender([
      ...questionListRender,
      questionListRender[questionListRender.length] + 1,
    ]);
    if (title && year && questionListRender.length >= 4) {
      setValido(true);
    }
  };

  const { register } = useForm<FormInterface>({
    resolver: CreateFormResolver,
  });

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

        const { data, status } = await FormService.createForm(requestData);

        if (status === 201) {
          ShowMessage.sucess("Formulário criado com sucesso");
          setTimeout(() => {
            console.log(data);
            navigate("/");
          }, 1500);
        } else {
          ShowMessage.error("Erro ao criar formulário");
        }
      } else {
        ShowMessage.error("Erro ao criar formulário");
      }
    } catch (error) {
      console.error(error);
      ShowMessage.error("Erro ao criar formulário")
    }
  };

  const handleSelectChange = (index: number, newValue: QuestionProps) => {
    const questionExists = selectedValues.some(
      (question) => question.id === newValue.id
    );

    if (!questionExists) {
      if (index >= 0 && index < selectedValues.length) {
        const updatedQuestions = [...selectedValues];
        console.log(updatedQuestions);
        updatedQuestions[index] = newValue;
        setSelectedValues(updatedQuestions);
      } else {
        setSelectedValues([...selectedValues, newValue]);
      }
    } else {
      ShowMessage.warning("Essa pergunta já foi adicionada!")
    }
  };

  const handleYearChange = (value: number) => {
    const currentFormFiltered = formList?.find(
      (form: FormInterface) => convertToDate(form.year)?.getFullYear() === value
    );

    if (currentFormFiltered) {
      ShowMessage.warning("Um formulário com esse ano já existe, verifique no banco de formulários")
    } else {
      setYear(value);
    }
  };

  const removeQuestion = (index: number, event: MouseEvent) => {
    event.preventDefault();

    const questionToRemove = selectedValues[index];
    const updatedSelectedValues = selectedValues.filter((_, i) => i !== index);
    setSelectedValues(updatedSelectedValues);
    const updatedQuestionListRender = questionListRender.filter(
      (_, i) => i !== index
    );
    setQuestionListRender(updatedQuestionListRender);
    if (questionToRemove) {
      const updatedResponseList = [...responseList, questionToRemove];
      setResponseList(updatedResponseList);
    }
  };

  return (
    <div className="h-auto min-h-screen w-full flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
        <form className="w-full pl-6 h-auto flex flex-col gap-9 pb-7 pt-10">
          <div className="">
            <BackButton navigateTo="/" />
          </div>
          <div className="">
            <h1 className="text-3xl font-bold">Criação de formulário</h1>
          </div>
          <div>
            <SparkNotification type="bar" variant="neutral" icon="info-i"><p>A quantidade mínima de perguntas são 5!</p></SparkNotification>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-[74%]">
              <SparkTextfield
                label="Título do feedback"
                placeholder="Feedback"
                defaultValue={title}
                {...register("title", {
                  setValueAs: (value) => {
                    setTitle(value);
                    return value;
                  },
                })}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = e.target.value;
                  console.log("Novo valor do título:", newValue);
                  setTitle(newValue);
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
            {questionListRender.map((component, index) => (
              <div
                className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center"
                key={index}
              >
                <div className="w-[95%] cursor-pointer flex flex-row gap-4">
                  <Selected
                    selectedValue={selectedValues[index]?.questionPt}
                    setSelectedValue={(newValue: QuestionProps) =>
                      handleSelectChange(index, newValue)
                    }
                    key={index}
                    labelText="Pergunta"
                    question={responseList.filter(
                      (item: QuestionProps) => item.active
                    )}
                  />
                  <button
                    className="w-auto bg-boschGrayText/10 rounded-full"
                    onClick={(event: MouseEvent) =>
                      removeQuestion(index, event)
                    }
                  >
                    <SparkIcon icName={"delete"} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-between items-center">
            <SparkButton
              text="Adicionar pergunta"
              icon="add"
              onClick={addNewQuestion}
              disabled={!(title && year)?true:false}
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
