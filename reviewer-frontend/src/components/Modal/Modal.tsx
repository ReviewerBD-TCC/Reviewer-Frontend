import {
  SparkButton,
  SparkTextfield,
  SparkToggle,
} from "@bosch-web-dds/spark-ui-react";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { ModalProps } from "interfaces/ModalInterfaces/Modal";
import { QuestionService } from "services/QuestionService";
import { CreateQuestionResolver } from "validations/CreateQuestionResolver";
import { ShowMessage } from "../../functions/ShowMessage";

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const id = props.id;
  const [active, setActive] = useState<boolean>(true);

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
          question,
          id
        );

        if (status === 202) {
          ShowMessage.sucess("Questão editada com sucesso")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        const { status } = await QuestionService.postQuestion(
          question
        );

        if (status === 201) {
          ShowMessage.sucess("Questão criada com sucesso")
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
