import { getCardList } from "components/CardList/CardList";
import { Card } from "components";

const adminHomepage = () => {

  const cardList = getCardList()
  
    return (
      <div className="bg-[#fff] w-[90%] h-full flex flex-col items-center justify-center">

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
      </div>
    );
  };

export default adminHomepage