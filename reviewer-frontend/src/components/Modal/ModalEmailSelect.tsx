import { SparkButton } from "@bosch-web-dds/spark-ui-react";
import React from "react";
import { useAuth } from "context/AuthProvider";
import { TableUser } from "components/Table/Table";
import { SparkNotification } from "@bosch-web-dds/spark-ui-react";
import { mailSender } from "services/EmailServices";
import { Email } from "interfaces/EmailInterfaces/Email";
import { ToastContainer } from "react-toastify";
import { EmailModal } from "interfaces/EmailInterfaces/EmailModal";
import { ShowMessage } from "../../functions/ShowMessage";

const ModalEmailSelect: React.FC<EmailModal> = (props) => {
  
  const { selectedUsers } = useAuth();

  const sendEmailSelected = () => {
    const bccAccounts: string[] = [];
    selectedUsers.map((each) => {
      bccAccounts.push(each.email);
    });
    const data: Email = {
      bcc: bccAccounts,
      body: props.data.body,
      subject: props.data.subject,
    };

    try {
      mailSender(data);

      ShowMessage.sucess("Email enviado com sucesso")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
              className="flex bg-boschWhite 2xl:h-[70%] md:h-[90%] md:w-[50%] flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b-black border-y-[1px] border-t-transparent items-start p-3">
                <p className="flexpl-3 font-bold">Disparo de indicações</p>
              </div>
              <div className="w-[95%] h-auto flex flex-col justify-center gap-14 m-auto">
                <div className="flex flex-col gap-2 ">
                  <h1 className="text-3xl font-semibold">Indicação pronta</h1>
                  <SparkNotification type="bar" variant="neutral" icon="info-i">
                    <p>
                      Selecione os colaboradores a receberem o formulário de
                      indicação
                    </p>
                  </SparkNotification>
                </div>
                <div>
                  <TableUser />
                </div>
                <div className="flex justify-end">
                  <SparkButton
                    text="Enviar"
                    pallete="primary"
                    onClick={() => sendEmailSelected()}
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

export default ModalEmailSelect;
