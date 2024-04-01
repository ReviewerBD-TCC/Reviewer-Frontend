import Header from "../../components/Header/Header"
import { SparkTextfield, SparkButton, SparkToggle } from "@bosch-web-dds/spark-ui-react"
import { SubmitHandler, useForm } from 'react-hook-form';
import { ClienteResolver } from "./ClienteResolver";
import api from "../../api/Api";
import { ChangeEvent, useState } from "react";
import { UserData } from "../../interfaces/CreateUser";

import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from 'react-router-dom';

function Register() {
  const [toggle, setToggle] = useState<NonNullable<boolean | undefined>>(false)

  const { register, handleSubmit, setValue } = useForm({
    resolver: ClienteResolver,
  });

  const navigate = useNavigate();


  function handleToggle(e: ChangeEvent<HTMLInputElement>){
    const newToggleValue = e.target.checked;

    if(newToggleValue == true){
      setValue("type", "ROLE_ADMIN")
    }
    setToggle(newToggleValue);
  }

  const createClient = (data: UserData) => api.post('auth/register', data);

  const showToastMessage = () =>{
    toast.success('Usuário cadastrado com sucesso!', {
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


  const onSubmit: SubmitHandler<UserData> = async (values) => {
    try {
      const { status, data } = await createClient(values);
      if (status === 201) {
        console.log('data: ', data)
        showToastMessage()
        setTimeout(()=>{
        navigate('/home')
      }, 1500)
      }
    } catch (error) {
      console.error('Erro ao enviar o cliente:', error);
    }
  };


  return (
    <div className="w-full h-screen">
      <Header />
      <div className={`bg-[#D0D0D0] w-full h-auto overflow-hidden flex justify-center items-center`}>
        
        <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center">
          <div className="w-[1234px] h-[729px] flex flex-col justify-center items-center gap-8">
            <div className="w-[50%] flex flex-col justify-center items-start">
              <h1 className="font-bold text-4xl text-start w-full ">Cadastro</h1>
              <p className="text-start w-full text-base">Adicione um colaborador ao seu time</p>
            </div>
            <form className="w-[50%] flex flex-col justify-center gap-6">
              <SparkTextfield type="text" label="Usuário" {...register("user", {
                setValueAs: (value) => {
                  handleSearch("user", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("user", event.target.value)} placeholder="Nome de usuário" />

              <SparkTextfield type="text" label="Nome" {...register("name", {
                setValueAs: (value) => {
                  handleSearch("name", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("name", event.target.value)} placeholder="Nome completo do colaborador" />

              <SparkTextfield type="text" label="E-mail"  {...register("email", {
                setValueAs: (value) => {
                  handleSearch("email", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("email", event.target.value)} placeholder="E-mail do colaborador" />

              <SparkTextfield type="text" label="Departamento" {...register("gkz", {
                setValueAs: (value) => {
                  handleSearch("gkz", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("gkz", event.target.value)} placeholder="Departamento do colaborador" />

              <SparkTextfield type="text" label="Gestor" {...register("manager", {
                setValueAs: (value) => {
                  handleSearch("manager", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("manager", event.target.value)} placeholder="Gestor do colaborador" />

              <SparkTextfield type="password" label="Senha" {...register("password", {
                setValueAs: (value) => {
                  handleSearch("password", value);
                  return value; 
                },
              })}  whenChange={(event) => setValue("password", event.target.value)} placeholder="Senha do colaborador" />

              <SparkToggle 
                guid="1" 
                rightLabel="usuario administrador" 
                disabled={false} 
                {...register("type", {
                  setValueAs: (value) => {
                    handleSearch("type", value);
                    return value; 
                  },
                })}
            
                whenChange={handleToggle}
              ></SparkToggle>
              
                <SparkButton text="Cadastrar" customWidth="15rem" type="submit" onClick={handleSubmit(onSubmit)} />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
export default Register