import api from '../../services/Api/Api'

import { AxiosResponse } from 'axios'

import Supergraphic from '../../assets/images/Supergraphic.png'
import Logo from '../../assets/images/Logo.png'
import { SparkTextfield, SparkButton, SparkLink } from '@bosch-web-dds/spark-ui-react'
import React, { useState } from 'react'

function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin() {
    try {
      const response: AxiosResponse = await api.post('auth/login', {
        email: email,
        password: password,
      },{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log(response);
    } catch (error) {
      console.error(error);
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
              guid="1" type="text" 
              label="E-mail" 
              placeholder="example@bosch.com" 
              value={email} 
              whenChange={(e: React.ChangeEvent<HTMLInputElement>) => {const emailUser = e.target.value; 
              setEmail(emailUser)}} />

            <SparkTextfield 
              guid="2" 
              type="password" 
              label="Senha" 
              placeholder="**********" 
              value={password} 
              whenChange={(e: React.ChangeEvent<HTMLInputElement>)=> {const passwordUser = e.target.value; setPassword(passwordUser)}}
              
              />
            <SparkLink type="primary" href="" target="" label="Esqueceu sua senha?" icon-position="" size="6xl" />
          </div>
          
          <div className='flex w-full h-[25%] justify-center items-end'>
            <SparkButton type="submit" text="Login" pallete="primary" custom-width="20rem" onClick={handleLogin} />
          </div>
        </form>
      </div>
  
  )
}
export default Login