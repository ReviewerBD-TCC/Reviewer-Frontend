import { useState } from "react";

export const getCardList = () => {
  const [cardList] = useState([
    {
      key: 1,
      title: (
        <h2 className="text-white font-bold xl:text-xl lg:text-lg">
          Banco de <br />Perguntas
        </h2>
      ),
      backgroundColor: "bg-boschPurple",
      nav: "/questions",
      description: "Aqui é onde você vê as perguntas que foram adicionadas ao banco",
      className: "",
    },
    {
      key: 2,
      title: (
        <h2 className="text-white font-bold xl:text-xl lg:text-lg">
          Criação de <br />Formulário
        </h2>
      ),
      backgroundColor: `bg-boschBlue`,
      nav: "/create-form",
      description: "Aqui é onde você pode fazer o formulário anualmente",
      className: "",
    },
    {
      key: 3,
      title: (
        <h2 className="text-white font-bold xl:text-xl lg:text-lg">
          Enviar <br />Formulário de Indicação
        </h2>
      ),
      backgroundColor: "bg-boschTurquoise",
      nav: "/send-indication",
      description:
        "Aqui é onde você monta o corpo do email para enviar o formulário de indicação para os funcionários",
      className: "",
    },
    {
      key: 4,
      title: (
        <h2 className="text-white font-bold xl:text-xl lg:text-lg">
          Visualizar <br /> Dashboard
        </h2>
      ),
      backgroundColor: "bg-boschGreen",
      nav: "/dashboard",
      description: "Aqui você visualiza todas as respostas dadas no feedback",
      className: "",
    },
    {
      key: 5,
      title: (
        <h2 className="text-white font-bold xl:text-xl lg:text-lg">
          Visualizar <br />Formulários
        </h2>
      ),
      backgroundColor: "bg-boschRed",
      nav: "/all-forms",
      description:
        "Aqui você visualiza os formulários feitos e pode remove-los ou edita-los",
      className: "",
    },
  ]);

  return cardList;
};
