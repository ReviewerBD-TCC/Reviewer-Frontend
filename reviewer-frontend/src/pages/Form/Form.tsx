import { useEffect, useState } from "react";
import { Header, Selected } from "components";
import { SparkButton, SparkTextarea } from "@bosch-web-dds/spark-ui-react";
import { AnswerService } from "../../services/AnswerService";
import { useAuth } from "context/AuthProvider";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionProps } from "interfaces/QuestionsInterface/Question";
import { FormService } from "../../services/FormService";
import { FormInterface, FormResponseInterface } from "interfaces/FormInterfaces/CreateForm";
import { AnswerFormResolver } from "validations/AnswerFormValidationSchema";
import { Form, QuestionAnswer } from "interfaces/FormInterfaces/SendForm";
import { useMsal } from "@azure/msal-react";
import { ShowMessage } from "../../functions/ShowMessage";


const FormComponent = () => {
  const { convertToDate } = useAuth();
  const languageOptions = ["Português", "Inglês"];
  const [languageSelect, setLanguageSelect] = useState("Português");
  const [formData, setFormData] = useState<FormResponseInterface>();
  const { instance } = useMsal()
  const {userId} = useParams()

  const account = instance.getActiveAccount();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<Form>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: AnswerFormResolver,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const forms = await FormService.getFormIndicated(account?.localAccountId);
        const currentYear = new Date().getFullYear();
        const currentFormFiltered = forms.find(
          (form: FormInterface) =>
            form.user.id === userId
        );
        setFormData(currentFormFiltered || null);
        console.log(currentFormFiltered)
        console.log(forms)

      } catch (error) {
        console.error("Erro ao carregar formulários: ", error);
      }
    };

    console.log(account?.localAccountId)
9


    fetchData();
  }, []);

  const form = formData;
  if (!form) {
    return <div>Nenhum dado do formulário disponível.</div>;
  }

  let formatTitle = formData.title;
  if (formatTitle) {
    formatTitle =
      formatTitle.charAt(0).toUpperCase() + formatTitle.slice(1).toLowerCase();
  }

  const yearDate = convertToDate(formData.year);
  let formattedYear;
  if (yearDate) {
    formattedYear = yearDate.toLocaleDateString("pt-BR", { year: "numeric" });
  } else {
    formattedYear = "Data não disponível";
  }

  const postAnswers = async () => {

    const answers = getValues()

     const questionAnswer: QuestionAnswer[] = form.questions?.map(
      (q: QuestionProps, index: number) => ({
        question: q.id,
        answer: { answer: answers.questionAnswer[index].answer.answer },
      })
    ) || [];

    const answerForm: Form = {
      questionFormId: formData.id,
      whoAnsweredId: account?.localAccountId,
      forWhichUser: formData.user.id,
      questionAnswer: questionAnswer,
    };


    try {
      const response = await AnswerService.postFormAnswers(answerForm);

      if(response?.status === 201){
        console.log(response?.data)
        ShowMessage.sucess("Respostas enviadas com sucesso!");
        setTimeout(() => {
          navigate("/confirmation");
        }, 1500);
      }
  
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      ShowMessage.error("Erro ao enviar respostas.")
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguageSelect(value);
  };

  console.log(formData.id)

  return (
    <div className="h-auto min-h-screen w-full flex flex-col items-center">
      <Header />
      <form className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
        <div className="w-full h-auto flex flex-col gap-9 pb-10 pt-10">
          <div className="w-full flex justify-between">
            <div className="w-4/5 h-auto">
              <h1 className="font-bold text-4xl">{formatTitle}</h1>
            </div>
            <div className="w-[20%]">
              <Selected
                labelText="Idioma"
                options={languageOptions}
                selectedValue={languageSelect}
                setSelectedValue={handleLanguageChange}
              />
            </div>
          </div>
          <div className="">
            <p>Este feedback é referente ao ano de {formattedYear}.</p>
            <p> Feedback indicado pelo(a) <strong>{formData.user.name}</strong></p>
          </div>
          <div>
          {form.questions?.map((q: QuestionProps, index: number) => (
              <div key={index} className="mt-10 list-decimal">
                <p className="font text-lg">
                  {index + 1} -{" "}
                  {languageSelect === "Português" ? q.questionPt : q.questionEn}
                </p>
                <div className="mt-3">
                  <SparkTextarea
                    {...register(`questionAnswer.${index}.answer.answer`, {
                      required: "A resposta não pode ser vazia.",
                    })}
                    placeholder="Escreva sua resposta aqui"
                  />
                  {errors.questionAnswer?.[index]?.answer?.answer && (
                    <span className="text-red-600 text-sm">
                        {errors.questionAnswer && <span className="text-red-600">*Pergunta obrigatória</span>}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <SparkButton
              text="Enviar"
              type="submit"
              onClick={handleSubmit(postAnswers)}
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormComponent;
