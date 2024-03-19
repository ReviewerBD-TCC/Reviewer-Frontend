import api from '../../services/Api/Api'

import { AxiosResponse } from 'axios'

import Supergraphic from '../../assets/images/Supergraphic.png'
import Logo from '../../assets/images/Logo.png'
import { SparkTextfield, SparkButton, SparkLink } from '@bosch-web-dds/spark-ui-react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';
import  z  from 'zod' 
        
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from 'react-router-dom';


import * as React from 'react'

const schema = z.object({
  email: z.string().email(),
  password: z.string()
});

type FormProps = z.infer<typeof schema>;

function Login() {


  const navigate = useNavigate();

  const showToastMessage = () =>{
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

  // const handleSaveToken = (token: string | any) =>{{
  //   setterToken(token)
  // }}

  async function handleLogin(props: FormProps) {
    try {
      const response: AxiosResponse = await api.post(
        'auth/login',
        {
          email: props.email,
          password: props.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      const token = response.data.token;
      localStorage.setItem('token', token)
      showToastMessage()
      setTimeout(()=>{
        navigate('/home')
      }, 1500)
      
    } catch (errors) {
      console.error(errors);
    }
  }

  return (
    
      <div className="w-full h-screen bg-login-background bg-no-repeat bg-center bg-cover flex justify-center flex-col items-center" >
        <div className='top-0 absolute'>
          <img src={Supergraphic} alt=""/>
          <img src={Logo} width={150}/>
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
              whenChange={()=>{}}/>

            <SparkTextfield
              {...register('password')} 
              guid="2" 
              type="password" 
              label="Senha" 
              placeholder="**********" 
              whenChange={()=> {}}
  
              />
            <SparkLink type="primary" href="" target="" label="Esqueceu sua senha?" icon-position="" size="6xl" />
          </div>
          
          <div className='flex w-full h-[25%] justify-center items-end'>
            <SparkButton type="submit" text="Login" pallete="primary" custom-width="20rem"  disabled={!isValid} onClick={handleSubmit(handleLogin)}/>
          </div>
          <ToastContainer/>
        </form>
      </div>
  
  )
}
export default Login