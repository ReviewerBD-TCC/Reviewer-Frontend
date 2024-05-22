import { useAuth } from "context/AuthProvider";
import Logo from "../../assets/images/logo_symbol_red_black.png";
import Supergraphic from "../../assets/images/Supergraphic.png";
import { Link } from "react-router-dom";
import { SparkIcon } from "@bosch-web-dds/spark-ui-react";

export function Header() {
  const { user } = useAuth();

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="border-b w-full bg-white top-0 flex justify-center items-center flex-col relative">
      <img src={Supergraphic} alt="Supergraphic" className="w-full" />

      <div className="w-[90%] flex flex-row justify-between items-center bg-boschWhite">
        <Link className="w-[70%] pt-4 pb-4" to={"/home"}>
          <img src={Logo} alt="CompanyLogo" className="w-40" />
        </Link>

        <div className="w-[25%] flex flex-row items-center gap-6">
          <div className="w-[90%] text-end">
            <p className="font-medium text-boschGrayText text-[15px]">
              {user?.name}
            </p>
          </div>

          {location.pathname !== "/register" && (
            <div className="w-auto">
              <button className="w-auto h-auto flex justify-center items-center">
                <SparkIcon
                  icName="logout"
                  noPadding={true}
                  onClick={() => logout()}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
