import { SparkTextfield, SparkButton, SparkToggle } from "@bosch-web-dds/spark-ui-react"
import { ToastContainer, Bounce, toast } from "react-toastify";
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from "../../interfaces/CreateUser";
import { ClienteResolver } from "../../validations/ClienteResolver";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Header } from "../../components/index"
// import { onSubmit } from "services/CreateUserService"; 
import api from "../../api/Api";

function Register() {
  const [toggle, setToggle] = useState<NonNullable<boolean | undefined>>(false)
  const navigate = useNavigate()

  const { register, handleSubmit, setValue, formState: {isValid} } = useForm({
    resolver: ClienteResolver,
  });

  function handleToggle(e: ChangeEvent<HTMLInputElement>){
    const newToggleValue = e.target.checked;
    setToggle(newToggleValue);
  }

  const createClient = (data: UserData) => api.post('auth/register', data);

  const showToastMessage = () => {
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
      }
    );
    toast.error('Não foi possível cadastrar o usuário', {
      position: 'top-right',
      autoClose: 2500,
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
          navigate('/')
        }, 1500)
      }
    } catch (error) {
      console.error('Erro ao enviar o cliente:', error);
    }
  };

  const handleSearch = (fieldName: string, value: string | number | boolean) => {
    // console.log(`Campo: ${fieldName}, Valor: ${value}`);    
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header/>
      <div className={`bg-[#fff] flex-grow w-full h-auto flex justify-center`}>
        <div className="bg-boschWhite w-[90%] h-auto flex items-center justify-center p-10">
          
          <div className="w-[1234px] h-auto flex flex-col justify-center items-center gap-8">
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

              <SparkTextfield type="text" label="Nome" 
              {...register("name", {
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
                  value: toggle === true ? "ROLE_ADMIN" : "ROLE_USER"
                })}
            
                whenChange={handleToggle}
              ></SparkToggle>
              
                <SparkButton disabled={!isValid} text="Cadastrar" customWidth="15rem" type="submit" onClick={handleSubmit(onSubmit)} />
                <ToastContainer/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register