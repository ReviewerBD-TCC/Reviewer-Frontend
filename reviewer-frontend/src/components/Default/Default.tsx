import React from "react";
import ModalConfirmation from "components/Modal/ModalConfirmation";
import useModal from "../../hooks/useModal";


interface DefaultProps {
  bgColor?: string;
  onFunction: (color: string) => void;
}

export const Default: React.FC<DefaultProps> = ({ bgColor, onFunction }) => {

  // const {isOpen, toggle} = useModal()

  return (
    <div className={`bg-[${bgColor}] w-full h-90vh flex justify-center items-center`}>
      <div className="bg-bosch-white h-screen w-[90%]">
        <button className="bg-[#0A7BC0] p-12 m-10" onClick={() => onFunction("#0A7BC0")}>
          <p className="text-white">Mudar cor</p>
        </button>
        <button className="bg-[#FFCF00] p-12 m-10" onClick={() => onFunction("#FFCF00")}>
          <p className="text-white">Mudar cor</p>
        </button>
        <button className="bg-[#18837E] p-12 m-10" onClick={() => onFunction("#18837E")}>
          <p className="text-white">Mudar cor</p>
        </button>
        <button className="bg-[#9E2896] p-12 m-10" onClick={() => onFunction("#18837E")}>
          <p className="text-white">Mudar cor</p>
        </button>
      {/* <ModalConfirmation  isOpen={isOpen} toggle={toggle} modalButtonText="Sim" modalSecondButtonText="Não" modalTitle="Você quer deletar esse formulário?" modalSubtitle="Você perderá todas as respostas desse formulário." /> */}
      </div>
    </div>
  );
};
