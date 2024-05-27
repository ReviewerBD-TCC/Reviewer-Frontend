import {
  SparkActivityIndicator,
  SparkButton,
} from "@bosch-web-dds/spark-ui-react";
import { Header, Selected } from "components";

import { useAuth } from "context/AuthProvider";
import { QuestionProps } from "interfaces/QuestionsInterface/Question";
import { ToastContainer} from "react-toastify";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { FormService } from "services/FormService";
import { NewQuestions } from "interfaces/FormInterfaces/SendForm";

import { useNavigate } from "react-router-dom";
import { QuestionService } from "services/QuestionService";
import { ShowMessage } from "../../functions/ShowMessage";

export const SingleForm = () => {
  const { convertToDate } = useAuth();
  const { id } = useParams();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const { data: responseFormList = [], isLoading } = useQuery("form", () => {
    return FormService.getFormQuestions(id);
  });
  const { data: allQuestions = [] } = useQuery("questions", () => {
    return QuestionService.getQuestions();
  });
  const [newQuestions, setNewQuestions] = useState<NewQuestions[]>([]);

  const form = responseFormList.length > 0 ? responseFormList[0] : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (responseFormList.length > 0) {
      setQuestions(form.questions);
    }
  }, [form]);

  let formattedYear = "Data não disponível";
  if (form) {
    const yearDate = convertToDate(form.year);
    if (yearDate) {
      formattedYear = yearDate.toLocaleDateString("pt-BR", { year: "numeric" });
    }
  }

  const verification = (value: number) => {
    return questions.find((each) => each.id === value)
  }

  const handleSelect = (index: number, newQuestion: QuestionProps) => {
    
    if (!verification(newQuestion.id)) {
      const updatedQuestions = questions.map((question, idx) =>
        idx === index ? newQuestion : question
      );
      setQuestions(updatedQuestions);
    } else {
      ShowMessage.warning("Essa pergunta já está no formulário");
    }
  };

  const handleNewQuestion = (newQuestion: NewQuestions) => {
    if (!verification(newQuestion.newQuestionId)) {
      const newItems = [...newQuestions, newQuestion];
      setNewQuestions(newItems);
    }
  };

  const updateForm = async () => {
    try {
      console.log(newQuestions);

      const editForm: any = {
        newQuestions: newQuestions,
      };

      const {data, status} = await FormService.editFormQuestion(
        form.id,
        editForm
      );

      console.log(editForm);

      if (status === 201) {
        ShowMessage.sucess("Formulário editado com sucesso!");
        setTimeout(() => {
          console.log(data);
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      ShowMessage.error("Erro ao criar formulário");
    }
  };

  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center">
      <Header />
      <div className="bg-boschWhite w-full min-h-[90%] h-auto flex items-center justify-center p-7">
        <div className="w-[80%] h-auto flex flex-col justify-center items-center gap-10 pt-8 pb-8">
          <div className="w-full h-12 flex flex-col justify-center">
            {form && (
              <>
                <h1 className="font-bold text-3xl text-start">
                  Feedback do {form.title}
                </h1>
                <p>Este feedback é referente ao ano de {formattedYear}</p>
              </>
            )}
          </div>

          <div className="w-full h-auto flex flex-col gap-8 ">
            {isLoading && <SparkActivityIndicator />}
            {form &&
              questions.map((element, index) => (
                <div
                  key={index}
                  className="bg-[#F1F1F1] w-full h-[125px] flex justify-center items-center"
                >
                  <div className="w-[95%]">
                    <Selected
                      selectedValue={element.questionPt}
                      setSelectedValue={(newValue: QuestionProps) =>
                        handleSelect(index, newValue)
                      }
                      labelText="Pergunta"
                      question={allQuestions.filter((item) => item.active)}
                      onSelect={handleNewQuestion}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-[77%] mb-11 justify-end items-end flex">
        <SparkButton
          customWidth="150px"
          text="Salvar"
          type="submit"
          onClick={updateForm}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
