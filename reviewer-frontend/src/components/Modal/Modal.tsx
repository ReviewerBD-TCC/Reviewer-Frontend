import {
  SparkButton,
  SparkTextfield,
  SparkToggle,
} from "@bosch-web-dds/spark-ui-react";
import React, { useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useAuth } from "context/AuthProvider";
import { useForm } from "react-hook-form";
import { ModalProps } from "interfaces/ModalInterfaces/Modal";
import { QuestionService } from "services/questionService";
import { CreateQuestionResolver } from "validations/CreateQuestionResolver";

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const id = props.id;
  const { accessToken } = useAuth();
  const [active, setActive] = useState<boolean>(true);

  const showToastMessage = () => {
    toast.success("Pergunta foi editada com sucesso!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const showToastMessageError400 = () => {
    toast.warning("Por favor preencha os campos corretamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const { handleSubmit, register } = useForm<ModalProps>({
    defaultValues: {
      questionPt: props.questionPt,
      questionEn: props.questionEn,
      active: active,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: CreateQuestionResolver,
  });

  const submitQuestion = async (props: ModalProps) => {
    try {
      const question: ModalProps = {
        questionPt: props.questionPt,
        questionEn: props.questionEn,
        active: active,
      };

      if (id) {
        const { status } = await QuestionService.updateQuestion(
          accessToken,
          question,
          id
        );

        if (status === 202) {
          showToastMessage();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        const { status } = await QuestionService.postQuestion(
          accessToken,
          question
        );

        if (status === 201) {
          showToastMessage();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {props.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={props.toggle}
        >
          <div className="flex justify-center items-center bg-black bg-opacity-40 w-full h-full">
            <div
              className="flex bg-boschWhite max-w-[40rem] w-[40rem] pt-6 pb-6 pl-8 pr-8"
              onClick={(e) => e.stopPropagation()}
            >
              {props.children}
              <div className="w-full h-auto flex flex-col justify-center gap-8 m-auto">
                <h1 className="text-3xl font-bold">{props.title}</h1>
                {id && (
                  <div className="flex justify-end items-end">
                    <SparkToggle
                      onClick={() => {}}
                      whenChange={() => {
                        setActive(!active);
                      }}
                      leftLabel="Pergunta ativa"
                      guid="spark-toggle-right-label"
                      selected={active}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <SparkTextfield
                    {...register("questionPt")}
                    label="Português"
                    defaultValue={props.questionPt}
                    placeholder="Digite a pergunta em português"
                  />
                  <SparkTextfield
                    {...register("questionEn")}
                    label="Inglês"
                    defaultValue={props.questionEn}
                    placeholder="Digite a pergunta em inglês"
                  />
                </div>
                <div className="flex items-end justify-end gap-4">
                  <SparkButton
                    text="Cancelar"
                    pallete="secondary"
                    onClick={props.toggle}
                  />

                  <SparkButton
                    text="Salvar"
                    onClick={handleSubmit(submitQuestion)}
                  />
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Modal;
