import { Header } from "../../components/index";
import { useMsal } from "@azure/msal-react";
import adminHomepage from "./AdminHomepage";
import userBdHomepage from "./UserBdHomepage";
import { NotfoundUser } from "pages/NotFound/NotFoundUser";

export const Homepage = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  return (
    <div
      className={`bg-[#fff] w-full h-screen flex justify-center items-center flex-col`}
    >
      {
        account?.idTokenClaims?.roles?.includes("ADMIN") || account?.idTokenClaims?.roles?.includes("BDUSERSWD")
          ? <Header />
          : <></>
      }
      <div className="bg-boschWhite h-screen w-full flex items-center justify-center flex-col">
          {
            account?.idTokenClaims?.roles?.includes("ADMIN")
            ? adminHomepage()
            : (account?.idTokenClaims?.roles?.includes("BDUSERSWD")
              ? userBdHomepage()
              : NotfoundUser()
            )
          }
      </div>
    </div>
  );
};
