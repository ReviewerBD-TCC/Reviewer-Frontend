import React, { useEffect, useState } from "react";
import { Header, Selected } from "components";
import { SparkButton, SparkTextarea, SparkActivityIndicator } from "@bosch-web-dds/spark-ui-react";
import { AnswerService } from "services/AnswerService";
import { useAuth } from "context/AuthProvider";
import { Form, SendForm, AnswerForm } from "interfaces/SendForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnswerFormResolver } from "validations/AnswerFormValidationSchema";
import { useQuery } from "react-query";

function Form() {
  const [dataApi, setDataAPi] = useState<Form[]>([]);
  const [form, setForm] = useState<Form>();
  const { accessToken } = useAuth();
  const languageOptions = ["Português", "Inglês"];
  const [ languageSelect, setLanguageSelect ] = useState<string>("Português")
  var formatTitle = form?.title;

  const { data: responseList = [], isLoading} = useQuery("form", () => {
    return AnswerService.getFormQuestions(accessToken, 1);
  });

  useEffect(() => {
    {
      setDataAPi(responseList);
      setForm(responseList[0]);
      console.log(responseList[0]);
    }
  }, [responseList]);


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AnswerForm>({
    resolver: AnswerFormResolver,
  });

  if (formatTitle) {
    formatTitle =
      formatTitle.charAt(0).toUpperCase() + formatTitle.slice(1).toLowerCase();
  }

  const postAnswers = (value: any) => {
    const answerForm: AnswerForm = {
      userId: 1,
      answers: getValues("answers"),
      questionFormId: 1,
    };
   // AnswerService.postFormAnswers(accessToken, answerForm);
    console.log(answerForm);
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
            <p>Este feedback é referente ao ano de {form?.year}</p>
          </div>
          <div>
            {dataApi.map((element, index) => (
              <div className="mt-14 list-decimal">
                <p className="font text-lg">
                  {index + 1} -{" "}
                  {languageSelect === "Português"
                    ? element.questionPt
                    : element.questionEn}
                </p>
                <div className="mt-3">
                  <SparkTextarea
                    {...register("answers", {
                      setValueAs: (value) => {
                        return value;
                      },
                    })}
                    whenChange={(event) =>
                      setValue("answers", event.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          {isLoading&&<SparkActivityIndicator/>}
          <div className="flex justify-end">
            <SparkButton text="Enviar" onClick={handleSubmit(postAnswers)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
