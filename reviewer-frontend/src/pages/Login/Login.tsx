import Supergraphic from '../../assets/images/Supergraphic.png'
import Logo from '../../assets/images/Logo.png'
import { SparkTextfield, SparkButton, SparkLink } from '@bosch-web-dds/spark-ui-react'
import { useForm } from 'react-hook-form'
import { ToastContainer, Bounce, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';

export const Login = () => {
  const { instance, accounts, inProgress } = useMsal();

  const navigate = useNavigate();

  useEffect(() => {
    if(accounts[0] && inProgress == "none") {
      navigate("/")
    }
  }, [accounts, inProgress])

  const showToastMessage = () => {
    toast.success('Login realizado com sucesso!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }
  const showToastMessageError = () => {
    toast.error('Verifique suas credenciais e tente novamente!', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  }



  return (

    <div className="w-full h-screen bg-login-background bg-no-repeat bg-center bg-cover flex justify-center flex-col items-center" >
      <div className='top-0 absolute'>
        <img src={Supergraphic} alt="" />
        <img src={Logo} width={150} />
      </div>
      <form className='w-[24rem] h-[30rem] bg-boschWhite flex flex-col justify-center items-center'>
        <div className='w-[20rem]'>
          <h2 className='font-bold text-3xl'>Login</h2>
        </div>
        {/* <div className='w-[20rem] h-[50%] flex flex-col gap-6 justify-center'>
          <SparkTextfield
            {...register('email')}
            guid="1" type="text"
            label="E-mail"
            placeholder="example@bosch.com"
            whenChange={() => { }} />

          {errors.email && <span>{errors.email.message}</span>}

          <SparkTextfield
            {...register('password')}
            guid="2"
            type="password"
            label="Senha"
            placeholder="**********"
            whenChange={() => { }}

          />

          {errors.password && <span className="text-red-600 text-sm">A senha precisa ter no mínimo 8 caractéres</span>}

          <SparkLink type="primary" href='/register' target="" label="Não tem cadastro? Clique aqui" icon-position="" size="6xl" />
        </div> */}

        <div className='flex w-full h-[25%] justify-center items-end'>
          <SparkButton type="submit" text="Login" pallete="primary" custom-width="20rem" onClick={() => instance.loginPopup()} />
        </div>
        <ToastContainer />
      </form>
    </div>

  )
}