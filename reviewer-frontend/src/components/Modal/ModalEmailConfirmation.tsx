import { SparkButton } from "@bosch-web-dds/spark-ui-react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { SubmitHandler } from "react-hook-form";
import { mailSender } from "services/EmailServices";
import ModalEmailSelect from "./ModalEmailSelect";
import useModal from "../../hooks/useModal";
import { Email } from "interfaces/EmailInterfaces/Email";
import React from "react";
import { EmailModal } from "interfaces/EmailInterfaces/EmailModal";

const ModalEmailConfirmation: React.FC<EmailModal> = (props) => {
  const { isOpen, toggle } = useModal();

  const sendEmail: SubmitHandler<Email> = async (values) => {
    mailSender(values);
    showToastMessage();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const showToastMessage = () => {
    toast.success("Colaboradores indicados com sucesso!", {
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

  return (
    <>
      {props.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={props.toggle}
        >
          <div className="flex justify-center items-center bg-black bg-opacity-40 w-full h-full ">
            <div
              className="flex bg-boschWhite w-[40rem] max-w-[40rem] h-auto pt-6 pb-6 pr-8 pl-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-auto flex flex-col justify-center gap-10 m-auto">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold">Indicação pronta</h1>
                  <p>Selecione os colaboradores a receberem o formulário.</p>
                </div>
                <div className="flex items-end justify-end gap-4">
                  <SparkButton
                    text="Enviar para todos"
                    pallete="primary"
                    onClick={() => sendEmail(props.data)}
                  />
                  <SparkButton
                    text="Selecionar colaboradores"
                    pallete="secondary"
                    onClick={toggle}
                  />
                  <ModalEmailSelect
                    data={props.data}
                    isOpen={isOpen}
                    toggle={toggle}
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

export default ModalEmailConfirmation;
