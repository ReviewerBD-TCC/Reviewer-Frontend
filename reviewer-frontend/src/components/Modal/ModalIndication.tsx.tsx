import { SparkButton } from "@bosch-web-dds/spark-ui-react";
import React, { MouseEventHandler } from "react";
import { useAuth } from "context/AuthProvider";
import { TableUser } from "components/Table/Table";
import { SparkNotification } from "@bosch-web-dds/spark-ui-react";
import { IndicationService } from "services/IndicationService";
import { CreateIndication } from "interfaces/UserInterfaces/CreateIndication";
import { UserIndicatedInterface } from "interfaces/UserInterfaces/CreateIndication";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EmailModal } from "interfaces/EmailInterfaces/EmailModal";
import { useMsal } from "@azure/msal-react";
import { User } from "interfaces/UserInterfaces/CreateUser";
import { ShowMessage } from "../../functions/ShowMessage";

const ModalIndication: React.FC<EmailModal> = (props) => {

  const { selectedUsers } = useAuth();
  const { instance } = useMsal()

  const account = instance.getActiveAccount();
  const navigate = useNavigate();

  const onSubmit: MouseEventHandler<HTMLSparkButtonElement> = async () => {
    try {
      const indicateds: UserIndicatedInterface[] = selectedUsers.map(
        (userId: User) => {
          const eachUser: UserIndicatedInterface = {
            userIndicated: userId.id,
          };
          return eachUser;
        }
      );
      const requestData: CreateIndication = {
        userIndication: account?.homeAccountId,
        indicateds: indicateds,
      };

      const { status } = await IndicationService.createIndication(requestData);

      if (status === 201) {
        ShowMessage.sucess("Funcionários indicados com sucesso")
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao enviar o cliente:", error);
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
              <div className="border-b-black border-y-2 border-t-transparent  items-start p-1">
                <p className="flexpl-3 font-bold">Disparo de indicações</p>
              </div>
              <div className="w-[95%] h-auto flex flex-col justify-center gap-14 m-auto">
                <div className="flex flex-col gap-2 ">
                  <h1 className="text-3xl font-semibold">Indicação pronta</h1>
                  <SparkNotification type="bar" variant="neutral" icon="info-i">
                    <p>Selecione os colaboradores a serem indicados.</p>
                  </SparkNotification>
                </div>
                <div>
                  <TableUser />
                </div>
                <div className="flex justify-end">
                  <SparkButton
                    text="Enviar"
                    pallete="primary"
                    onClick={onSubmit}
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

export default ModalIndication;
