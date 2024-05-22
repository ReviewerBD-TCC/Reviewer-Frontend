import { SparkButton } from "@bosch-web-dds/spark-ui-react";
import React from "react";
import { FormService } from "services/FormService";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useAuth } from "context/AuthProvider";
import { ModalConfirmationProps } from "interfaces/ModalInterfaces/ModalConfirmation";

const ModalConfirmation: React.FC<ModalConfirmationProps> = (props) => {
  const { accessToken } = useAuth();

  const showToastMessage = () => {
    toast.success("Formulário deletado com sucesso!", {
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

  const deleteForm = async (formId: number) => {
    try {
      const { status } = await FormService.deleteForm(accessToken, formId);
      if (status === 204) {
        showToastMessage();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
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
          <div className="flex justify-center items-center bg-black bg-opacity-40 w-full h-full ">
            <div
              className="flex bg-boschWhite w-[40rem] h-auto pt-6 pb-6 pl-8 pr-8 flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-auto flex flex-col justify-center gap-8 m-auto">
                <div className="flex flex-col gap-8">
                  <h1 className="text-3xl font-semibold">{props.modalTitle}</h1>
                  <div className="">
                    <p>{props.modalSubtitle}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <SparkButton
                    text={props.modalSecondButtonText}
                    pallete="secondary"
                    onClick={props.toggle}
                    customWidth="100px"
                  />
                  <SparkButton
                    text={props.modalButtonText}
                    pallete="primary"
                    onClick={() => deleteForm(props?.formId)}
                    customWidth="100px"
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

export default ModalConfirmation;
