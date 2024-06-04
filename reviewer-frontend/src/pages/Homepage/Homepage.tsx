import { useState } from 'react'
import { Card, Header } from '../../components/index'
import { AnswerPerQuestionService } from 'services/AnswerPerQuestionService';
import { useQuery } from 'react-query';
import { useAuth } from 'context/AuthProvider';
import { useMsal } from "@azure/msal-react";

export const Homepage = () => {

    const { data: responseAnswerList = [] } = useQuery("answer", () => {
      return AnswerPerQuestionService.getAnswerPerForm(1);
    });

    const { setDashboard } = useAuth();

    setDashboard(responseAnswerList); 

    const { instance } = useMsal();
 
    const account = instance.getActiveAccount();
 

  return (
    <div
      className={`bg-[#fff] w-full h-screen flex justify-center items-center flex-col`}
    >
      <Header />
      {account?.idTokenClaims?.roles.includes("BDUSERSWD") ? (
        <div>BDUSER</div>
      ) : (
        <div className="bg-boschWhite h-screen w-full flex items-center justify-center flex-col">
          <div className="bg-[#fff] w-[90%] h-full flex flex-col justify-center items-center">
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
        </div>
      )}
    </div>
  );
};