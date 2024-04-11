import Supergraphic from '../../assets/images/Supergraphic.png'
import Logo from '../../assets/images/Logo.png'
import { SparkTextfield, SparkButton, SparkLink } from '@bosch-web-dds/spark-ui-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod'
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService'
import { UserLogin } from '../../interfaces/LoginUser'

import { UserData } from 'interfaces/CreateUser'
import { useAuth } from 'context/AuthProvider'
import api from '../../api/Api';

const schema = z.object({
  email: z.string().email(),
  password: z.string()
});

type FormProps = z.infer<typeof schema>;

function Login() {

  const { setAccessToken, accessToken } = useAuth();

  const navigate = useNavigate();

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
      transition: Bounce,
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
      transition: Bounce,
    });
  }

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormProps>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });


  const handleLogin = async (values: UserLogin) => {
    try {
      const { status, data } = await UserService.handleLogin(values);

      if (status === 200 && data['token']) {
        setAccessToken(data['token']);
        api.defaults.headers.Authorization = `Bearer ${data["token"]}`
        showToastMessage()
        setTimeout(() => {
          console.log(accessToken)
          navigate('/home')
        }, 1500)
      }
    } catch (error) {
      console.error(error);
      showToastMessageError()
    }
  };

  

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
        <div className='w-[20rem] h-[50%] flex flex-col gap-6 justify-center'>
          <SparkTextfield
            {...register('email')}
            guid="1" type="text"
            label="E-mail"
            placeholder="example@bosch.com"
            whenChange={() => { }} />

          <SparkTextfield
            {...register('password')}
            guid="2"
            type="password"
            label="Senha"
            placeholder="**********"
            whenChange={() => { }}

          />
          <SparkLink type="primary" href="" target="" label="Esqueceu sua senha?" icon-position="" size="6xl" />
        </div>

        <div className='flex w-full h-[25%] justify-center items-end'>
          <SparkButton type="submit" text="Login" pallete="primary" custom-width="20rem" disabled={!isValid} onClick={handleSubmit(handleLogin)} />
        </div>
        <ToastContainer />
      </form>
    </div>

  )
}
export default Login