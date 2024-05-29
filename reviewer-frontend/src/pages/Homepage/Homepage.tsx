import { Card, Header } from "../../components/index";
import { useMsal } from "@azure/msal-react";
import { getCardList } from "components/CardList/CardList";

export const Homepage = () => {
  const { instance } = useMsal();

  const account = instance.getActiveAccount();

  const cardList = getCardList()

  const adminHomepage = () => {

    return (
      <>
        <div className="w-full h-16 flex">
          <h1 className="font-bold text-3xl">Painel administrador</h1>
        </div>
        <div className="w-full h-2/4 flex justify-around items-center flex-row gap-4 bg-boschWhite">
          {cardList.map((i: any) => (
            <Card
              key={i.key}
              description={i.description}
              text={i.title}
              backgroundColor={i.backgroundColor}
              nav={i.nav}
              className={"hover:h-60 shadow-2xl ease-out duration-500"}
            />
          ))}
        </div>
      </>
    );
  };

  const userBdHomepage = () => {

    const filteredCards = cardList.filter((card: any)=> card.key == 6);

    return (
      <>
        <div className="w-full h-16 flex">
          <h1 className="font-bold text-3xl">Painel do usuário</h1>
        </div>
        <div className="w-full h-2/4 flex justify-start items-center flex-row gap-4 bg-boschWhite">
          {filteredCards.map((i: any) => (
            <Card
              key={i.key}
              description={i.description}
              text={i.title}
              backgroundColor={i.backgroundColor}
              nav={i.nav}
              className={"hover:h-60 shadow-2xl ease-out duration-500"}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={`bg-[#fff] w-full h-screen flex justify-center items-center flex-col`}
    >
      <Header />
      <div className="bg-boschWhite h-screen w-full flex items-center justify-center flex-col">
        <div className="bg-[#fff] w-[90%] h-full flex flex-col justify-center items-center">
          {account?.idTokenClaims?.roles?.includes("admina")
            ? adminHomepage()
            : userBdHomepage()}
        </div>
      </div>
    </div>
  );
};
