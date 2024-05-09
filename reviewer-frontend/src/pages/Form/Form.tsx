import { useState } from "react";
import { Header, Selected } from "components";
import {
  SparkButton,
  SparkTextarea,
  SparkActivityIndicator,
} from "@bosch-web-dds/spark-ui-react";
import { AnswerService } from "services/AnswerService";
import { useAuth } from "context/AuthProvider";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Form, QuestionAnswer } from "interfaces/SendForm";
import { toast, Zoom } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QuestionProps } from "interfaces/Question";

const FormComponent = () => {
  const { accessToken, user } = useAuth();
  const languageOptions = ["Português", "Inglês"];
  const [languageSelect, setLanguageSelect] = useState("Português");

  const convertToDate = (input: Date) => {
    const date = new Date(input);
    return isNaN(date.getTime()) ? undefined : date;
  };

  const { register, handleSubmit, getValues } = useForm();

  const navigate = useNavigate();

  const {
    data: formData,
    isLoading,
    error,
  } = useQuery(
    ["form", 5],
    () => AnswerService.getFormQuestions(accessToken, 5)
  );

  if (isLoading) {
    return <SparkActivityIndicator />;
  }

  if (error) {
    return <div>Erro ao carregar dados.</div>;
  }

  const form = formData?.[0];
  if (!form) {
    return <div>Nenhum dado do formulário disponível.</div>;
  }

  let formatTitle = formData?.[0].title;
  if (formatTitle) {
    formatTitle =
      formatTitle.charAt(0).toUpperCase() + formatTitle.slice(1).toLowerCase();
  }

  const yearDate = convertToDate(formData?.[0].year);
  let formattedYear;
  if (yearDate) {
    formattedYear = yearDate.toLocaleDateString("pt-BR", { year: "numeric" });
  } else {
    formattedYear = "Data não disponível";
  }

  const postAnswers = async () => {
    const answers = getValues("answers");
    const questionsIds = form.questions.map((q: QuestionProps) => q.id);

    console.log("questions: ", questionsIds);

    const questionAnswer: QuestionAnswer[] = questionsIds.map((id: number, index: number) => ({
      question: id,
      answer: {
        answer: answers[index],
      },
    }));

    const answerForm: Form = {
      questionFormId: 5,
      userId: user.id,
      questionAnswer,
    };

    console.log(answerForm);

    try {
      const response = await AnswerService.postFormAnswers(
        accessToken,
        answerForm
      );

      if (response.status === 201) {
        toast.success("Respostas enviadas com sucesso!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Zoom,
        });

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      toast.error("Erro ao enviar respostas.");
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguageSelect(value);
  };

  return (
    <div className="h-auto min-h-screen w-full flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
        <div className="w-[85%] h-auto flex flex-col gap-9 pb-7 pt-7">
          <div className="w-full flex justify-between">
            <div className="w-4/5 h-auto">
              <h1 className="font-bold text-4xl">{formatTitle}</h1>
            </div>
            <div className="w-[20%]">
              <Selected
                labelText="Idioma"
                options={languageOptions}
                zIndex={50}
                selectedValue={languageSelect}
                setSelectedValue={handleLanguageChange}
              />
            </div>
          </div>
          <div className="">
            <p>Este feedback é referente ao ano de {formattedYear}.</p>
          </div>
          <div>
            {form.questions.map((q: QuestionProps, index: number) => (
              <div className="mt-14 list-decimal">
                <p className="font text-lg">
                  {index + 1} -{" "}
                  {languageSelect === "Português" ? q.questionPt : q.questionEn}
                </p>
                <div className="mt-3">
                  <SparkTextarea
                    {...register(`answers.${index}`)}
                    placeholder="Escreva sua resposta aqui"
                  />
                </div>
              </div>
            ))}
          </div>
          {isLoading && <SparkActivityIndicator />}
          <div className="flex justify-end">
            <SparkButton text="Enviar" onClick={handleSubmit(postAnswers)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
