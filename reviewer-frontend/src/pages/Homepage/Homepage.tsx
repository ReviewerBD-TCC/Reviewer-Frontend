import { useState } from 'react'
import { Card, Header } from '../../components/index'
import { AnswerPerQuestionService } from 'services/AnswerPerQuestionService';
import { useQuery } from 'react-query';
import { useAuth } from 'context/AuthProvider';
import { useMsal } from "@azure/msal-react";
import adminHomepage from "./AdminHomepage";
import userBdHomepage from "./UserBdHomepage";

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
      <div className="bg-boschWhite h-screen w-full flex items-center justify-center flex-col">
          {account?.idTokenClaims?.roles?.includes("User.Read")
            ? adminHomepage()
            : userBdHomepage()}
      </div>
    </div>
  );
};
