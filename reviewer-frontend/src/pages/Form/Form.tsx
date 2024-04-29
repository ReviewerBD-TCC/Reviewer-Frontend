import React, { useEffect, useState } from "react";
import { Header, Selected } from "components";
import { SparkButton, SparkTextarea, SparkActivityIndicator } from "@bosch-web-dds/spark-ui-react";
import { getFormQuestions, postFormAnswers } from "services/FormsService";
import { useAuth } from "context/AuthProvider";
import { Form, SendForm, AnswerForm } from "interfaces/SendForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnswerFormResolver } from "validations/AnswerFormValidationSchema";
import { useQuery } from "react-query";

function Form() {
  const [dataApi, setDataAPi] = useState<Form[]>([]);
  const [form, setForm] = useState<Form>();
  const { language, accessToken } = useAuth();
  //    useEffect(()=>{
  //     const formQuestion = getFormQuestions(token, 1)
  //     const data = formQuestion.then(function(response){
  //         const data = response.map(element=>{
  //             return element
  //         })
  //       setDataAPi(data)
  //       setForm(data[1])
  //       console.log(data)
  //     })
  //    },[])

  const { data: responseList = [], isLoading} = useQuery("form", () => {
    return getFormQuestions(accessToken, 1);
  });

  useEffect(() => {
    {
      setDataAPi(responseList);
      setForm(responseList[0]);
      console.log(responseList[0]);
    }
  });

  const languageOptions = ["Português", "Inglês"];

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AnswerForm>({
    resolver: AnswerFormResolver,
  });

  var formatTitle = form?.title;
  if (formatTitle) {
    formatTitle =
      formatTitle.charAt(0).toUpperCase() + formatTitle.slice(1).toLowerCase();
  }

  // console.log(getValues('answers'))

  const postAnswers = (value: any) => {
    const answerForm: AnswerForm = {
      userId: 1,
      answers: getValues("answers"),
      questionFormId: 1,
    };
    postFormAnswers(accessToken, answerForm);
    console.log(value);
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
                zIndex={50}
                options={languageOptions}
              />
            </div>
          </div>
          <div className="">
            <p>Este feedback é referente ao ano de {form?.year}</p>
          </div>
          <div>
            {dataApi.map((element, index) => (
              <div className="mt-14 list-decimal">
                {/* <ol className='list-decimal'> */}
                <p className="font text-lg">
                  {index + 1} -{" "}
                  {language == "Português"
                    ? element.questionPt
                    : element.questionEn}
                </p>
                {/* </ol> */}
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
