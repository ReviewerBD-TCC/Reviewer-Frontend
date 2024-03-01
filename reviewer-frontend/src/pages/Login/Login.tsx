import Supergraphic from '../../assets/images/Supergraphic.png'
import Logo from '../../assets/images/Logo.png'
import { SparkTextfield, SparkButton, SparkLink } from '@bosch-web-dds/spark-ui-react'
import { useState } from 'react'

export const Login = () => {

  const [login, setLogin] = useState({})

  const [email, setEmail] = useState('')
  const handleInput = (e) =>{
    const newEmail = e.target.value

    setEmail(newEmail)
  }
  console.log(email)

  return (
    <form className="w-full h-screen bg-login-background bg-no-repeat bg-center bg-cover flex justify-center flex-col items-center" >
        <div className='top-0 absolute'>
          <img src={Supergraphic} alt=""  />
          <img src={Logo} width={150}/>
        </div>
        <div className='w-[23rem] h-[30rem] bg-bosch-white flex flex-col justify-center items-center'>
          <div className='w-[20rem] '>
            <h2 className='font-bold text-3xl'>Login</h2>
          </div>
          <div className='w-[20rem] h-[50%] flex flex-col gap-6 justify-center'>
            <SparkTextfield guid="1" type="text" label="E-mail" placeholder="" value={email} whenChange={handleInput} />
            <SparkTextfield guid="" type="password" label="Senha" placeholder="" />
            <SparkLink type="primary" href="" target="" label="Esqueceu sua senha?" size="m" icon-position=""/>
            <p>{email}</p>
          </div>

          <div className='flex w-full h-[25%] justify-center items-end'>
            <SparkButton type="button" text="Login" pallete="primary" custom-width="20rem"/>
          </div>
         
        </div>
    </form>
  )
}
