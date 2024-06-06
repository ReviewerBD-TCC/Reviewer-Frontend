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
      description: "Visualize e gerencie as perguntas adicionadas ao banco de dados.",
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
      description: "Crie formulários anuais com rapidez e facilidade. ",
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
        "Escreva o e-mail para encaminhar o formulário de indicação aos funcionários.",
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
      description: "Visualize as respostas dos formulários.",
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
        "Visualize, edite e remova os formulários criado.",
      className: "",
    },
  ]);

  return cardList;
};
