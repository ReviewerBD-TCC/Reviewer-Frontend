import Supergraphic from '../../assets/images/Supergraphic.png'
import Logo from '../../assets/images/Logo.png'
import { SparkButton } from '@bosch-web-dds/spark-ui-react'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { UserService } from '../../services/UserService'

export const Login = () => {
  const { instance, accounts, inProgress } = useMsal();

  const navigate = useNavigate();

  useEffect(() => {
    if(accounts[0] && inProgress == "none") {
      navigate("/")
      UserService.saveUserLogged()
    }
  }, [accounts, inProgress])

  return (
    <div className="w-full h-screen bg-login-background bg-no-repeat bg-center bg-cover flex justify-center flex-col items-center" >
      <div className='top-0 absolute'>
        <img src={Supergraphic} alt="" />
        <img src={Logo} width={150} />
      </div>
      <form className='w-[24rem] h-[20rem] p-7 gap-8 bg-boschWhite flex flex-col justify-center items-center'>
        <div className='w-full h-fit'>
          <h2 className='font-bold text-3xl'>Login</h2>
        </div>
        <div className='flex w-full h-[25%] justify-center items-end'>
          <SparkButton type="submit" text="Login" pallete="primary" custom-width="20rem" onClick={() => instance.loginPopup()} />
        </div>
      </form>
    </div>

  )
}