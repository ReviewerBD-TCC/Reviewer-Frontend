import { useMsal } from "@azure/msal-react";

export const NotfoundUser = () => {

    const { instance } = useMsal()
    function logout() {
        instance.logoutRedirect({
          postLogoutRedirectUri: "/",
      });
    }

    return (
    <div className='w-full min-h-screen h-auto flex flex-col items-center'>
        <div className='w-full flex-grow flex flex-col gap-3 justify-center items-center'>
            <h1 className='font-extrabold text-7xl text-boschRed'>401</h1>
            <p className='font-bold text-xl'>Você não possui permissão para acessar esta aplicação.</p>
            <a href="/" onClick={()=> logout()}>Voltar ao login</a>
        </div>
    </div>
    );
  };