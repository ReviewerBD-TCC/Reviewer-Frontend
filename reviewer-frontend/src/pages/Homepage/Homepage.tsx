import { Header } from "../../components/index";
import { useMsal } from "@azure/msal-react";
import adminHomepage from "./AdminHomepage";
import userBdHomepage from "./UserBdHomepage";

export const Homepage = () => {
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
